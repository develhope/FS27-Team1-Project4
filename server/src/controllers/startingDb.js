import { db } from "../db.js";
import dotenv from "dotenv";
import { productsSingleGear, preBuiltPc } from "../productsList.js";
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
        `INSERT INTO gear (type, image, gear, brand, series, features, original_price, discount, link_info, stock)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
          product.stock
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
        `INSERT INTO pc (type, name, image, description, original_price, discount, stock)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          pc.type,
          pc.name,
          pc.img,
          pc.description,
          pc.originalPrice,
          pc.discount,
          pc.stock
        ]
      );
    } catch (error) {
      console.log(error);
    }
  }
}
