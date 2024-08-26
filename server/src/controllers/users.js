import dotenv from "dotenv";
dotenv.config();

import { db } from "../db.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const { KEY, SECRET } = process.env;

let iv = crypto.randomBytes(16);

/* We create the Schemas for the Validations (we make sure server side that the body of the request is correct) */

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const signUpSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).pattern(new RegExp("(?=.*[a-z])")).pattern(new RegExp("(?=.*[A-Z])")).pattern(new RegExp("(?=.*[0-9])")).required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  birthdate: Joi.date().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  postalCode: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
  phone: Joi.string().allow(null),
  avatarUrl: Joi.string().allow(null),
});

const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  birthdate: Joi.date().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  postalCode: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
  phone: Joi.string().allow(null),
  avatarUrl: Joi.string().allow(null),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).pattern(new RegExp("(?=.*[a-z])")).pattern(new RegExp("(?=.*[A-Z])")).pattern(new RegExp("(?=.*[0-9])")).required()
})

const alternativeAddressSchema = Joi.object({
  userId: Joi.number().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  postalCode: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
});

const addCreditCardSchema = Joi.object({
  userId: Joi.number().required(),
  holder: Joi.string().required(),
  number: Joi.string()
    .length(16)
    .pattern(/^\d+$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
  expire: Joi.string()
    .length(5)
    .pattern(/^\d{2}\/\d{2}$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
  cvv: Joi.string()
    .length(3)
    .pattern(/^\d+$/)
    .required()
    .messages({ msg: "Value must contain only numbers" }),
});

export async function selectUserByUsernameOrEmail(username) {
  const user = await db.oneOrNone(
    `
    SELECT
      u.id,
      u.avatar_url AS "avatarUrl",
      u.username,
      u.password,
      u.email,
      u.firstname,
      u.lastname,
      json_build_object(
        'birthdate', u.birthdate,
        'country', u.country,
        'city', u.city,
        'address', u.address,
        'postalCode', u.postal_code,
        'phone', u.phone
      ) AS "informations",
       jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name,
          'employeeId', g.employee_id,
          'completed', g.completed
        )
      ) AS "games",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'cardHolderName', c.card_holder_name,
          'cardNumber', c.card_number,
          'lastFourDigit', c.last_four_digits,
          'expirationDate', c.expiration_date,
          'cvv', c.cvv
        )
      ) AS "billingInformations",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'country', a.country,
          'city', a.city,
          'address', a.address,
          'postalCode', a.postal_code
        )
      ) AS "alternativeShipping",
      u.admin,
      u.token,
      u.created_at AS "created"
    FROM users u
    LEFT JOIN users_games ug ON u.id = ug.user_id
    LEFT JOIN games g ON ug.game_id = g.id
    LEFT JOIN users_cards uc ON u.id = uc.user_id
    LEFT JOIN credit_cards c ON uc.credit_card_id = c.id
    LEFT JOIN users_alternative_address ua ON u.id = ua.user_id
    LEFT JOIN alternative_address a ON ua.address_id = a.id
    WHERE u.username=$1 OR u.email=$1 AND deleted_at IS NULL
    GROUP BY u.id, u.avatar_url, u.username, u.password, u.email, u.firstname, u.lastname, u.country, u.city, u.address, u.postal_code, u.phone, u.admin, u.created_at
    `,
    [username]
  );

  return user;
}

export async function selectUserById(id) {
  const user = await db.oneOrNone(
    `
    SELECT
      u.id,
      u.avatar_url AS "avatarUrl",
      u.username,
      u.password,
      u.email,
      u.firstname,
      u.lastname,
      json_build_object(
        'birthdate', u.birthdate,
        'country', u.country,
        'city', u.city,
        'address', u.address,
        'postalCode', u.postal_code,
        'phone', u.phone
      ) AS "informations",
       jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name,
          'employeeId', g.employee_id,
          'completed', g.completed
        )
      ) AS "games",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'cardHolderName', c.card_holder_name,
          'cardNumber', c.card_number,
          'lastFourDigit', c.last_four_digits,
          'expirationDate', c.expiration_date,
          'cvv', c.cvv
        )
      ) AS "billingInformations",
      jsonb_agg(
        DISTINCT jsonb_build_object(
          'country', a.country,
          'city', a.city,
          'address', a.address,
          'postalCode', a.postal_code
        )
      ) AS "alternativeShipping",
      u.admin,
      u.token,
      u.created_at AS "created"
    FROM users u
    LEFT JOIN users_games ug ON u.id = ug.user_id
    LEFT JOIN games g ON ug.game_id = g.id
    LEFT JOIN users_cards uc ON u.id = uc.user_id
    LEFT JOIN credit_cards c ON uc.credit_card_id = c.id
    LEFT JOIN users_alternative_address ua ON u.id = ua.user_id
    LEFT JOIN alternative_address a ON ua.address_id = a.id
    WHERE u.id=$1 AND deleted_at IS NULL
    GROUP BY u.id, u.avatar_url, u.username, u.password, u.email, u.firstname, u.lastname, u.country, u.city, u.address, u.postal_code, u.phone, u.admin, u.created_at
    `,
    [id]
  );

  return user;
}

/* This function let us get the users informations*/
export async function getUsers(req, res) {
  try {
    const users = await db.manyOrNone(`
      SELECT
        u.id,
        u.avatar_url AS "avatarUrl",
        u.username,
        u.password,
        u.email,
        u.firstname,
        u.lastname,
        json_build_object(
          'birthdate', u.birthdate,
          'country', u.country,
          'city', u.city,
          'address', u.address,
          'postalCode', u.postal_code,
          'phone', u.phone
        ) AS "informations",
         jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name,
          'employeeId', g.employee_id,
          'completed', g.completed
        )
      ) AS "games",
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'cardHolderName', c.card_holder_name,
            'cardNumber', c.card_number,
            'lastFourDigit', c.last_four_digits,
            'expirationDate', c.expiration_date,
            'cvv', c.cvv
          )
        ) AS "billingInformations",
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'country', a.country,
            'city', a.city,
            'address', a.address,
            'postalCode', a.postal_code
          )
        ) AS "alternativeShipping",
        u.admin,
        u.token,
        u.created_at AS "created"
      FROM users u
      LEFT JOIN users_games ug ON u.id = ug.user_id
      LEFT JOIN games g ON ug.game_id = g.id
      LEFT JOIN users_cards uc ON u.id = uc.user_id
      LEFT JOIN credit_cards c ON uc.credit_card_id = c.id
      LEFT JOIN users_alternative_address ua ON u.id = ua.user_id
      LEFT JOIN alternative_address a ON ua.address_id = a.id
      WHERE deleted_at IS NULL
      GROUP BY u.id, u.avatar_url, u.username, u.password, u.email, u.firstname, u.lastname, u.country, u.city, u.address, u.postal_code, u.phone, u.admin, u.created_at
    `);

   return res.status(200).json(users);
  } catch (error) {
    console.log(error);
   return res.status(500).json({ msg: error });
  }
}

/* This function let us get one user based on thei id */
export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await db.oneOrNone(
      `
      SELECT
        u.id,
        u.avatar_url AS "avatarUrl",
        u.username,
        u.password,
        u.email,
        u.firstname,
        u.lastname,
        json_build_object(
          'birthdate', u.birthdate,
          'country', u.country,
          'city', u.city,
          'address', u.address,
          'postalCode', u.postal_code,
          'phone', u.phone
        ) AS "informations",
         jsonb_agg(
        DISTINCT jsonb_build_object(
          'id', g.id,
          'name', g.name,
          'employeeId', g.employee_id,
          'completed', g.completed
        )
      ) AS "games",
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'cardHolderName', c.card_holder_name,
            'cardNumber', c.card_number,
            'lastFourDigit', c.last_four_digits,
            'expirationDate', c.expiration_date,
            'cvv', c.cvv
          )
        ) AS "billingInformations",
        jsonb_agg(
          DISTINCT jsonb_build_object(
            'country', a.country,
            'city', a.city,
            'address', a.address,
            'postalCode', a.postal_code
          )
        ) AS "alternativeShipping",
        u.admin,
        u.token,
        u.created_at AS "created"
      FROM users u
      LEFT JOIN users_games ug ON u.id = ug.user_id
      LEFT JOIN games g ON ug.game_id = g.id
      LEFT JOIN users_cards uc ON u.id = uc.user_id
      LEFT JOIN credit_cards c ON uc.credit_card_id = c.id
      LEFT JOIN users_alternative_address ua ON u.id = ua.user_id
      LEFT JOIN alternative_address a ON ua.address_id = a.id
      WHERE deleted_at IS NULL AND u.id=$1
      GROUP BY u.id, u.avatar_url, u.username, u.password, u.email, u.firstname, u.lastname, u.country, u.city, u.address, u.postal_code, u.phone, u.admin, u.created_at
    `,
      [id]
    );

    if (!user) {
     return res.status(404).json({msg: "user not found"})
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

/* This function let us get one user based on their username */
export async function getUserByUsername(req, res) {
  const { username } = req.params;

  try {
    const user = await selectUserByUsernameOrEmail(username);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const validateLogin = loginSchema.validate({ username, password });

    if (validateLogin.error) {
      return res
        .status(400)
        .json({ msg: validateLogin.error.details[0].message });
    }

    const user = await selectUserByUsernameOrEmail(username);


    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.id,
        username,
      };

      const token = jwt.sign(payload, SECRET);

      await db.none(
        `
      UPDATE users
      SET token=$2
      WHERE id=$1`,
        [user.id, token]
      );

      const updatedUser = await selectUserByUsernameOrEmail(username);

      res
        .status(200)
        .json({ msg: `${username} logged in`, user: updatedUser, token });

    } else {
      res.status(400).json({ msg: "Username or Password Incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "An error occured" });
  }
}

export async function signUp(req, res) {
  try {
    const {
      username,
      password,
      email,
      firstname,
      lastname,
      birthdate,
      country,
      city,
      address,
      postalCode,
      phone,
      avatarUrl,
    } = req.body;

    const validateSignUp = signUpSchema.validate(req.body);

    if (validateSignUp.error) {
      return res
        .status(400)
        .json({ msg: validateSignUp.error.details[0].message });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await db.one(
      `INSERT INTO users (username, password, email, firstname, lastname, country, city, address, postal_code, phone, admin, avatar_url, birthdate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false, $11, $12) RETURNING id, username`,
      [
        username,
        encryptedPassword,
        email,
        firstname,
        lastname,
        country,
        city,
        address,
        postalCode,
        phone,
        avatarUrl,
        birthdate
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

    const newUser = await selectUserByUsernameOrEmail(user.username);
    res
      .status(201)
      .json({ msg: `User ${newUser.username} created`, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function logout(req, res) {
  try {
    const user = req.user;
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null]);
    res.status(200).json({ msg: "Logout successfull" });
  } catch (error) {
    res.status(500).json({ msg: error.details });
  }
}

export async function addAlternativeAddress(req, res) {
  try {
    const address = req.body;

    const validatedAlternativeAddress =
      alternativeAddressSchema.validate(address);

    if (validatedAlternativeAddress.error) {
      return res
        .status(400)
        .json({ msg: validatedAlternativeAddress.error.details[0].message });
    }

    const { id } = await db.one(
      `
      INSERT INTO alternative_address (country, city, address, postal_code)
      VALUES ($1, $2, $3, $4) RETURNING id`,
      [address.country, address.city, address.address, address.postalCode]
    );

    await db.none(
      `
      INSERT INTO users_alternative_address (user_id, address_id)
      VALUES ($1, $2)`,
      [address.userId, id]
    );

    res.status(201).json({ msg: "New address added" });
  } catch (error) {
    res.status(500).json({ msg: error.details });
  }
}

export async function addCreditCard(req, res) {
  const card = req.body;

  const validatedCard = addCreditCardSchema.validate(card);

  if (validatedCard.error) {
    return res
      .status(400)
      .json({ msg: validatedCard.error.details[0].message });
  }

  try {
    const { id } = await db.one(
      `INSERT INTO credit_cards (card_holder_name, card_number, last_four_digits, expiration_date, cvv)
      VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        encryptData(card.holder),
        encryptData(card.number),
        encryptData(getLastFourDigits(card.number)),
        encryptData(card.expire),
        encryptData(card.cvv),
      ]
    );

    await db.none(
      `INSERT INTO users_cards (user_id, credit_card_id) VALUES ($1, $2)`,
      [card.userId, id]
    );

    res.status(201).json({ msg: "Credit Card added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function updateUser(req, res) {
  try {
    const {id} = req.params;
    const {
      username,
      email,
      firstname,
      lastname,
      country,
      city,
      address,
      postalCode,
      phone,
      avatarUrl,
      birthdate
    } = req.body;

    const validateUpdate = updateUserSchema.validate(req.body);

    if (validateUpdate.error) {
      console.log(validateUpdate.error.details);

      return res
        .status(400)
        .json({ msg: validateUpdate.error.details[0].message });
    }

    const user = await db.one(
      `UPDATE users
       SET avatar_url=$11,
           username=$1,
           email=$2,
           firstname=$3,
           lastname=$4,
           country=$5,
           city=$6,
           address=$7,
           postal_code=$8,
           phone=$9,
           birthdate=$12
        WHERE id=$10
        RETURNING username`,
      [
        username,
        email,
        firstname,
        lastname,
        country,
        city,
        address,
        postalCode,
        phone,
        id,
        avatarUrl,
        birthdate
      ]
    );

    const newUser = await selectUserByUsernameOrEmail(user.username);
    res
      .status(201)
      .json({ msg: `User ${newUser.username} updated`, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function checkPassword (req, res) {
  const {id} = req.params
  const {password} = req.body

  try {
    const user = await db.oneOrNone(
      `SELECT password from users WHERE id=$1`,
      [Number(id)]
    )

    if (!user) {
      return res.status(404).json({msg: "User not found"})
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(201).json({msg: "The password is correct"})
    } else {
      res.status(400).json({msg: "Password incorrect"})
    }

  } catch(error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function updatePassword (req, res) {
  const {id} = req.params
  const {password} = req.body

  try {

    const passwordValidate = updatePasswordSchema.validate(req.body)

    if (passwordValidate.error) {
      return res.status(409).json({msg: passwordValidate.error.details[0].message})
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    await db.none(
      `UPDATE users SET password=$2 WHERE id=$1`,
      [id, encryptedPassword]
    )

    const user = await selectUserById(id)

    if (!user) {
      return res.status(404).json({msg: "User not found"})
    }

    res.status(200).json({msg: "Password changed", user})

  } catch(error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}


export async function softUserDelete(req, res) {
  const { id } = req.params;

  try {
    const userCreditCards = await db.manyOrNone(
      `SELECT id, credit_card_id FROM users_cards
      WHERE user_id=$1`,
      [Number(id)]
    );

    const linkId = userCreditCards.map((cc) => cc.id);
    const cardsId = userCreditCards.map((cc) => cc.credit_card_id);

    if (cardsId.length > 0) {
      await db.none(
        `DELETE FROM users_cards
        WHERE id=ANY($1::int[]);

        DELETE FROM credit_cards
        WHERE id=ANY($2::int[])`,
        [linkId, cardsId]
      );
    }

    const { deleted_at } = await db.one(
      `UPDATE users
       SET deleted_at=NOW()
       WHERE id=$1
       RETURNING deleted_at`,
      [Number(id)]
    );

    res
      .status(200)
      .json({ msg: `User ${username} has been deleted on ${deleted_at}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function hardDeleteUser(req, res) {
  const { id } = req.params;

  try {
    const userCreditCards = await db.manyOrNone(
      `SELECT id, credit_card_id FROM users_cards
      WHERE user_id=$1`,
      [Number(id)]
    );

    const userGames = await db.manyOrNone(
      `SELECT id, game_id FROM users_games
      WHERE user_id=$1`,
      [Number(id)]
    );

    const userAddresses = await db.manyOrNone(
      `SELECT id, address_id FROM users_alternative_address
      WHERE user_id=$1`,
      [Number(id)]
    );

    const linkId = userCreditCards.map((cc) => cc.id);
    const cardsId = userCreditCards.map((cc) => cc.credit_card_id);
    const linkGamesId = userGames.map((g) => g.id);
    const gamesId = userGames.map((g) => g.game_id);
    const linkAddressId = userAddresses.map((a) => a.id);
    const addressId = userAddresses.map((a) => a.address_id);

    if (cardsId.length > 0) {
      await db.none(
        `DELETE from users_cards
        WHERE id=ANY($1::int[]);

        DELETE from credit_cards
        WHERE id=ANY($2::int[])`,
        [linkId, cardsId]
      );
    }

    if (gamesId.length > 0) {
      await db.none(
        `DELETE from users_games
        WHERE id=ANY($1::int[]);

        DELETE from games
        WHERE id=ANY($2::int[])`,
        [linkGamesId, gamesId]
      );
    }

    if (addressId.length > 0) {
      await db.none(
        `DELETE from users_alternative_address
        WHERE id=ANY($1::int[]);

        DELETE from alternative_address
        WHERE id=ANY($2::int[])`,
        [linkAddressId, addressId]
      );
    }

    await db.none(
      `DELETE from users
       WHERE id=$1`,
      [Number(id)]
    );

    res.status(200).json({ msg: `User ${id} has been annihilated` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function getCards(req, res) {
  const cards = await db.manyOrNone(`SELECT * from credit_cards`);
  res.status(200).json(cards);
}

/* This function encrypts informations */
export function encryptData(data) {
  let cipher = crypto.createCipheriv("aes-256-cbc", KEY, iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

/* This function decrypts informations */
export function decryptData(encryptData) {
  let decipher = crypto.createDecipheriv("aes-256-cbc", KEY, iv);
  let decrypted = decipher.update(encryptData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
}

/* This functions let us create encrypted mocking credit cards for our mocking users */
export function createEncryptedCCForMockUsers(
  cardHolder,
  cardNumber,
  fourDigits,
  date,
  cvv
) {
  return {
    cardHolder: encryptData(cardHolder),
    cardNumber: encryptData(cardNumber),
    fourDigits: encryptData(fourDigits),
    expires: encryptData(date),
    cvv: encryptData(cvv),
  };
}

/* This function will extract the last for digits of our users' cards */
export function getLastFourDigits(creditNumber) {
  let lastFourDigit = "";

  for (let i = creditNumber.length - 4; i < creditNumber.length; i++) {
    lastFourDigit += creditNumber[i];
  }

  return lastFourDigit;
}
