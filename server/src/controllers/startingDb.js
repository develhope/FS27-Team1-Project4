import { db } from "../db.js";
import dotenv from "dotenv";
import { productsSingleGear, preBuiltPc, productsBrand } from "../arrays_to_create_database/productsList.js";
import {faqs} from "../arrays_to_create_database/faqList.js"
import { newsletterEmails } from "../arrays_to_create_database/newsletterEmails.js";
dotenv.config();

/* Module created to generate the base mocking data on the database,
it will take care of the various dependencies of the elements, ganarating
the relational tables while we create data for the initial database. */

export async function createUser(
  username,
  password,
  email,
  firstname,
  lastname,
  country,
  city,
  address,
  postalCode,
  admin,
  img
) {
  try {
    const user = await db.one(
      `INSERT INTO users (username, password, email, firstname, lastname, country, city, address, postal_code, admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        username,
        password,
        email,
        firstname,
        lastname,
        country,
        city,
        address,
        postalCode,
        admin,
      ]
    );

    const schiariti = await db.one(`
    INSERT INTO games (name, employee_id, completed)
    VALUES ('A. Schiariti', 'id 212', false) RETURNING id`);

    const provenzano = await db.one(`
    INSERT INTO games (name, employee_id, completed)
    VALUES ('D. Provenzano', 'id 210', false) RETURNING id`);

    await db.none(
      `INSERT INTO users_games (user_id, game_id)
    VALUES ($1, $2),($1, $3)`,
      [user.id, schiariti.id, provenzano.id]
    );

    await db.none(`UPDATE users SET avatar_url=$2 WHERE id=$1`, [user.id, img]);
  } catch (error) {
    console.log(error);
  }
}

export async function createCC(
  holder,
  number,
  lastFourDigits,
  expires,
  cvv,
  userId
) {
  try {
    const { id } = await db.one(
      `INSERT INTO credit_cards (card_holder_name, card_number, last_four_digits, expiration_date, cvv)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [holder, number, lastFourDigits, expires, cvv]
    );

    await db.none(
      `INSERT INTO users_cards (user_id, credit_card_id)
    VALUES ($1, $2)`,
      [userId, id]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createAltAddress(
  country,
  city,
  address,
  postalCode,
  userId
) {
  try {
    const { id } = await db.one(
      `INSERT INTO alternative_address (country, city, address, postal_code)
    VALUES ($1, $2, $3, $4) RETURNING id`,
      [country, city, address, postalCode]
    );

    await db.none(
      `INSERT INTO users_alternative_address (user_id, address_id)
    VALUES ($1, $2)`,
      [userId, id]
    );
  } catch (error) {
    console.log(error);
  }
}

export async function createGearDatabase() {
  for (const product of productsSingleGear) {
    try {
      await db.none(
        `INSERT INTO gear (type, image, gear, brand, series, features, original_price, discount, link_info, stock, incoming_stock)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          product.type,
          product.img,
          product.gear,
          product.brand,
          product.series,
          product.features,
          product.originalPrice,
          product.discount,
          product.linkInfo,
          product.stock,
          product.incomingStock
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function createPCDatabase() {
  for (const pc of preBuiltPc) {
    try {
      await db.none(
        `INSERT INTO pc (type, name, image, description, original_price, discount, stock, incoming_stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          pc.type,
          pc.name,
          pc.img,
          pc.description,
          pc.originalPrice,
          pc.discount,
          pc.stock,
          pc.incomingStock
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export async function createFaqs() {
  for (const faq of faqs) {
    try {
      await db.none(
        `INSERT INTO faqs (question, awnser)
        VALUES ($1, $2)`,
        [faq.question,  faq.answer]
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export async function createTicket(openedBy, category, ticketTitle, numberOFMessages) {
  try {
    await db.none(
      `INSERT INTO tickets (opened_by, category, ticket_title, number_of_messages)
    VALUES ($1, $2, $3, $4)`,
    [openedBy, category, ticketTitle, numberOFMessages])
  } catch (error) {
    console.log(error)
  }
}

export async function createTicketChat(array) {
  try {
    for (const chat of array) {
      await db.none(
        `INSERT INTO chat_messages(ticket_id, author_id, image, content)
        VALUES ($1, $2, $3, $4)`,
        [chat.ticketId, chat.author === "Bredina" ? 1 : 2, chat.image, chat.content ]
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export async function createUserLastSeenMessage(ticketId, userId, lastMessage) {
  try {
    await db.none(
      `INSERT INTO last_message(ticket_id, user_id, last_message)
      VALUES ($1, $2, $3)`,
      [ticketId, userId, lastMessage]
    )
  } catch(error) {
    console.log(error)
  }
}

export async function createBrands() {
  for (const brand of productsBrand) {
    try {
      await db.none(
        `INSERT INTO brands(brand)
        VALUES ($1)`,
        [brand]
      )
    }
    catch(error) {
      console.log(error)
    }
  }
}

export async function createMockingNewsletter() {
  for (const email of newsletterEmails) {
    try {
      await db.none(
        `INSERT INTO newsletter_subscribers(email)
        VALUES ($1)`,
        [email]
      )
    } catch(error) {
      console.log(error)
    }
  }
}
