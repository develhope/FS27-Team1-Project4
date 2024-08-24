import { db } from "../db.js";
import Joi from "joi";

const addItemToCartSchema = Joi.object({
  gearId: Joi.alternatives().conditional('pcId', {
    is: Joi.exist(),
    then: Joi.valid(null),
    otherwise: Joi.number().integer().required()
  }),
  pcId: Joi.alternatives().conditional('gearId', {
    is: Joi.exist(),
    then: Joi.valid(null),
    otherwise: Joi.number().integer().required()
  })
});

const createShippingSchema = Joi.object({
  userId: Joi.number().integer().required(),
  order: Joi.array().items(Joi.number().integer()).required(),
});

const changeShippingStatusSchema = Joi.object({
  status: Joi.string().valid(
    "Pending",
    "Working on it",
    "Canceled",
    "On its way",
    "Delivered",
    "Returned",
    "Failed"
  ),
  order: Joi.array().items(Joi.number().integer()).required(),
});

export async function getAllCartProducts(req, res) {
  try {
    const cartProducts = await db.manyOrNone(
      `SELECT * FROM cart_products ORDER BY id`
    );

    res.status(200).json(cartProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getCartByUserId(req, res) {
  const { id } = req.params;
  try {
    const cart = await db.oneOrNone(
      `SELECT
        u.username AS "user",
        jsonb_agg(
            jsonb_build_object(
              'id', cp.id,
              'gearId', g.id,
              'type', g.type,
              'series', g.series,
              'brand', g.brand,
              'image', g.image,
              'originalPrice', g.original_price,
              'discount', g.discount,
              'orderedAt', cp.ordered_at,
              'status', cp.status,
              'shippingNumber', s.number,
              'createdAt', cp.created_at,
              'deletedAt', cp.deleted_at
            )
          ORDER BY cp.gear_id
        ) FILTER (WHERE g.id IS NOT NULL) AS "gearList",
        jsonb_agg(
          jsonb_build_object(
            'id', cp.id,
            'pcId', p.id,
            'type', p.type,
            'name', p.name,
            'image', p.image,
            'originalPrice', p.original_price,
            'discount', p.discount,
            'orderedAt', cp.ordered_at,
            'status', cp.status,
            'shippingNumber', s.number,
            'createdAt', cp.created_at,
            'deletedAt', cp.deleted_at
          ) ORDER BY cp.pc_id
        ) FILTER (WHERE p.id IS NOT NULL) AS "pcList"
      FROM users u
      LEFT JOIN cart_products cp ON u.id = cp.user_id
      LEFT JOIN gear g ON cp.gear_id = g.id
      LEFT JOIN pc p ON cp.pc_id = p.id
      LEFT JOIN shipping s ON s.id = cp.shipping_id
      WHERE u.id=$1
      GROUP BY u.username`,
      [Number(id)]
    );

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function addProductToUserCart (req, res) {
  const {id} = req.params
  const {gearId, pcId} = req.body

  try {

    const addItemToCartValidation = addItemToCartSchema.validate(req.body)

    if (addItemToCartValidation.error) {
      return res.status(409).json({msg: addItemToCartValidation.error.details[0].message})
    }

    await db.none(
     `INSERT INTO cart_products (user_id, gear_id, pc_id)
     VALUES ($1, $2, $3)`,
     [id, gearId, pcId]
    )

    res.status(201).json({msg: `Item ${gearId ? `Gear ${gearId}`: `PC ${pcId}`} added to user ${id} cart`})

  } catch(error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function getAllShipping(req, res) {
  try {
    const shippings = await db.manyOrNone(
      `SELECT
        s.id,
        u.username AS "user",
        s.number,
        jsonb_agg(
          jsonb_build_object(
            'id', cp.id,
            'gearId', g.id,
            'type', g.type,
            'series', g.series,
            'brand', g.brand,
            'image', g.image,
            'originalPrice', g.original_price,
            'discount', g.discount,
            'orderedAt', cp.ordered_at,
            'shippingNumber', s.number,
            'status', cp.status,
            'createdAt', cp.created_at,
            'deletedAt', cp.deleted_at
          )
        ORDER BY cp.gear_id
        ) FILTER (WHERE g.id IS NOT NULL) AS "gearList",
        jsonb_agg(
          jsonb_build_object(
            'id', cp.id,
            'pcId', p.id,
            'type', p.type,
            'name', p.name,
            'image', p.image,
            'originalPrice', p.original_price,
            'discount', p.discount,
            'orderedAt', cp.ordered_at,
            'shippingNumber', s.number,
            'status', cp.status,
            'createdAt', cp.created_at,
            'deletedAt', cp.deleted_at
          )
        ORDER BY cp.pc_id
        ) FILTER (WHERE p.id IS NOT NULL) AS "pcList",
        s.status AS "status",
        s.created_at AS "createdAt"
        FROM shipping s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN cart_products cp ON s.id = cp.shipping_id
        LEFT JOIN gear g ON g.id = cp.gear_id
        LEFT JOIN pc p ON p.id = cp.pc_id
        GROUP BY s.id, u.username, s.number, s.status, s.created_at
        `
    );

    if (!shippings) {
      return res
        .status(404)
        .json({ msg: "Couldn't retrieve the shipping list" });
    }

    res.status(200).json(shippings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getShippingById(req, res) {
  const { id } = req.params;

  try {
    const shipping = await db.oneOrNone(
      `SELECT
        s.id,
        u.username AS "user",
        s.number,
        jsonb_agg(
          jsonb_build_object(
            'id', cp.id,
            'gearId', g.id,
            'type', g.type,
            'series', g.series,
            'brand', g.brand,
            'image', g.image,
            'originalPrice', g.original_price,
            'discount', g.discount,
            'orderedAt', cp.ordered_at,
            'shippingNumber', s.number,
            'status', cp.status,
            'createdAt', cp.created_at,
            'deletedAt', cp.deleted_at
          )
        ORDER BY cp.gear_id
        ) FILTER (WHERE g.id IS NOT NULL) AS "gearList",
        jsonb_agg(
          jsonb_build_object(
            'id', cp.id,
            'pcId', p.id,
            'type', p.type,
            'name', p.name,
            'image', p.image,
            'originalPrice', p.original_price,
            'discount', p.discount,
            'orderedAt', cp.ordered_at,
            'shippingNumber', s.number,
            'status', cp.status,
            'createdAt', cp.created_at,
            'deletedAt', cp.deleted_at
          )
        ORDER BY cp.pc_id
        ) FILTER (WHERE p.id IS NOT NULL) AS "pcList",
        s.status AS "status",
        s.created_at AS "createdAt"
        FROM shipping s
        LEFT JOIN users u ON s.user_id = u.id
        LEFT JOIN cart_products cp ON s.id = cp.shipping_id
        LEFT JOIN gear g ON g.id = cp.gear_id
        LEFT JOIN pc p ON p.id = cp.pc_id
        WHERE id=$1
        GROUP BY s.id, u.username, s.number, s.status, s.created_at
        `,
      [Number(id)]
    );

    if (!shipping) {
      return res
        .status(404)
        .json({ msg: "Couldn't retrieve the shipping requested" });
    }

    res.status(200).json(shipping);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function createNewShipping(req, res) {
  const { userId, order } = req.body;

  try {
    const validateShipping = createShippingSchema.validate(req.body);

    if (validateShipping.error) {
      return res
        .status(409)
        .json({ msg: validateShipping.error.details[0].message });
    }

    const { id, number } = await db.one(
      `INSERT INTO shipping (user_id, number, status)
      VALUES (
        $1,
        CONCAT(TO_CHAR(NOW(), 'YYYYMMDDHH24MISS'), FLOOR(RANDOM() * 90 + 10)::text),
        'Pending'
      )
        RETURNING id, number`,
      [userId]
    );

    await db.none(
      `UPDATE cart_products
      SET shipping_id=$2, ordered_at=NOW(), status='Pending'
      WHERE id= ANY($1)`,
      [order, id]
    );

    res.status(201).json({ msg: `Order ${number} created` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updateShippingStatus(req, res) {
  const { id } = req.params;
  const { status, order } = req.body;

  try {
    const updateStatusValidation = changeShippingStatusSchema.validate(req.body);

    if (updateStatusValidation.error) {
      return res
        .status(409)
        .json({ msg: updateStatusValidation.error.details[0].message });
    }
    await db.none(
      `UPDATE shipping
      SET status=$2
      WHERE id=$1`,
      [Number(id), status]
    );

    await db.none(
      `UPDATE cart_products
      SET status=$2
      WHERE id= ANY($1)`,
      [order, status]
    );

    res.status(200).json({ msg: `Shipping ${id} status updated to ${status}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function deleteCartItem(req, res) {
  const {id} = req.params

  try {
    await db.none(
      `UPDATE cart_products
      SET deleted_at=NOW()
      WHERE id=$1`,
      [id]
    )

    res.status(200).json({msg: "Item deleted from the cart"})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}
