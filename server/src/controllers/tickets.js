import Joi from "joi";
import { db } from "../db.js";

const createTicketSchema = Joi.object({
  openedBy : Joi.number().required(),
  category: Joi.string().valid("build-your-pc", "shipping", "others").required(),
  ticketTitle: Joi.string().required()
})

const chatAnswerSchema = Joi.object({
  authorId: Joi.number().required(),
  image: Joi.string().allow(null).optional(),
  ticketId: Joi.number().required(),
  content: Joi.string().required(),
});

const messageUpdateSchema = Joi.object({
  messageId: Joi.number().required(),
  content: Joi.string().required(),
});

export async function getAllTickets(req, res) {
  try {
    const tickets = await db.manyOrNone(
      `SELECT
      t.id,
      t.opened_by AS "openedBy",
      t.category,
      t.ticket_title AS "ticketTitle",
      t.number_of_messages AS "numberOfMessages",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', cm.id,
          'authorId', cm.author_id,
          'image', cm.image,
          'content', cm.content,
          'createdAt', cm.created_at
        )
      ) AS "chat",
      t.created_at AS "createdAt",
      t.closed_at AS "closedAt"
    FROM tickets t
    LEFT JOIN (
      SELECT
        cm.id,
        cm.author_id,
        cm.image,
        cm.content,
        cm.created_at,
        cm.ticket_id
      FROM chat_messages cm
      WHERE cm.deleted_at IS NULL
      ORDER BY cm.id
    ) cm ON t.id = cm.ticket_id
    GROUP BY t.id, t.opened_by, t.category, t.ticket_title, t.number_of_messages, t.created_at, t.closed_at
    `
    );

    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getTicketsByUserId(req, res) {
  const { id } = req.params;

  try {
    const tickets = await db.many(
      `SELECT
      t.id,
      t.opened_by AS "openedBy",
      t.category,
      t.ticket_title AS "ticketTitle",
      t.number_of_messages AS "numberOfMessages",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', cm.id,
          'authorId', cm.author_id,
          'image', cm.image,
          'content', cm.content,
          'createdAt', cm.created_at
        )
      ) AS "chat",
      t.created_at AS "createdAt",
      t.closed_at AS "closedAt"
    FROM tickets t
    LEFT JOIN (
      SELECT
        cm.id,
        cm.author_id,
        cm.image,
        cm.content,
        cm.created_at,
        cm.ticket_id
      FROM chat_messages cm
      WHERE cm.deleted_at IS NULL
      ORDER BY cm.id
    ) cm ON t.id = cm.ticket_id
    WHERE t.opened_by=$1
    GROUP BY t.id, t.opened_by, t.category, t.ticket_title, t.number_of_messages, t.created_at, t.closed_at
    `,
      [Number(id)]
    );

    if (tickets) {
      res.status(200).json(tickets);
    } else {
      res.status(404).json({ msg: "Tickets not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getTicketById(req, res) {
  const { id } = req.params;

  try {
    const ticket = await db.oneOrNone(
      `SELECT
      t.id,
      t.opened_by AS "openedBy",
      t.category,
      t.ticket_title AS "ticketTitle",
      t.number_of_messages AS "numberOfMessages",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', cm.id,
          'authorId', cm.author_id,
          'image', cm.image,
          'content', cm.content,
          'createdAt', cm.created_at
        )
      ) AS "chat",
      t.created_at AS "createdAt",
      t.closed_at AS "closedAt"
    FROM tickets t
    LEFT JOIN (
      SELECT
        cm.id,
        cm.author_id,
        cm.image,
        cm.content,
        cm.created_at,
        cm.ticket_id
      FROM chat_messages cm
      WHERE cm.deleted_at IS NULL
      ORDER BY cm.id
    ) cm ON t.id = cm.ticket_id
    WHERE t.id=$1
    GROUP BY t.id, t.opened_by, t.category, t.ticket_title, t.number_of_messages, t.created_at, t.closed_at
    `,
      [Number(id)]
    );

    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function createNewTicket(req, res) {
  const {openedBy, category, ticketTitle} = req.body

  try {
    const validateCreateTicket = createTicketSchema.validate(req.body)

    if (validateCreateTicket.error) {
      return res.status(400).json({msg:validateCreateTicket.error.details[0].message})
    }

    const {id} = await db.one(
      `INSERT INTO tickets (opened_by, category, ticket_title)
      VALUES ($1, $2, $3)
      RETURNING id`,
      [openedBy, category, ticketTitle]
    )

    res.status(201).json({msg: "Ticket opened", id})

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function addChatAnswer(req, res) {
  const { ticketId } = req.params;
  const { authorId, image, content } = req.body;

  try {
    const validateChatAnswer = chatAnswerSchema.validate({
      ticketId,
      authorId,
      image,
      content,
    });

    if (validateChatAnswer.error) {
      return res
        .status(400)
        .json({ msg: validateChatAnswer.error.details[0].message });
    }

    const message = await db.one(
      `INSERT INTO chat_messages (author_id, image, ticket_id, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [authorId, image, ticketId, content]
    );

    res.status(201).json({ msg: "Message added", message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function modifyChatMessage(req, res) {
  const { messageId } = req.params;
  const { content } = req.body;

  try {
    const messageUpdateValidation = messageUpdateSchema.validate({
      messageId,
      content,
    });

    if (messageUpdateValidation.error) {
      return res
        .status(400)
        .json({ msg: messageUpdateValidation.error.details[0].message });
    }

    const message = await db.one(
      `UPDATE chat_messages
      SET content=$2
      WHERE id=$1
      RETURNING *`,
      [messageId, content]
    );

    res.status(201).json({ msg: "Message updated", message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function deleteMessage(req, res) {
  const { messageId } = req.params;

  try {
    const message = await db.one(
      `UPDATE chat_messages
      SET deleted_at=NOW()
      WHERE id=$1
      RETURNING *`,
      [messageId]
    );

    res.status(201).json({ msg: "Message deleted", message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function closeTicket(req, res) {
  const { id } = req.params;

  try {
    const ticket = await db.one(
      `UPDATE tickets
      SET closed_at=NOW()
      WHERE id=$1
      RETURNING *`,
      [id]
    );

    res.status(201).json({ msg: "Ticket Closed", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getLastMessages (req, res) {
  try {
    const lastMessages = await db.manyOrNone(
      `SELECT
        id,
        ticket_id AS "ticketId",
        user_id AS "userId",
        last_message AS "lastMessage"
      FROM last_message
      ORDER BY id
      `
    )

    res.status(200).json(lastMessages)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function getLastMessagesByUserId (req, res) {
  const {id} = req.params

  try {
    const lastMessages = await db.manyOrNone(
      `SELECT
        id,
        ticket_id AS "ticketId",
        user_id AS "userId",
        last_message AS "lastMessage"
      FROM last_message
      WHERE user_id=$1
      `,
      [id]
    )

    res.status(200).json(lastMessages)

  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function updateReadMessages(req, res) {
  const {ticketId} = req.params
  const {userId} = req.body

  try {
    const ticket = await db.one(
      `SELECT * FROM tickets WHERE id=$1`, [ticketId]
    )
    await db.none(
      `UPDATE last_message
      SET last_message = t.number_of_messages
      FROM tickets t
      WHERE last_message.ticket_id=$1 AND last_message.ticket_id = t.id AND last_message.user_id=$2`,
      [ticketId, userId]
    )

    res.status(200).json({msg: "Last Message seen updated succesfully", ticket})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:error})
  }
}
