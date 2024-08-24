import passport from "passport";
import dotenv from "dotenv";
import { db } from "./db.js";
dotenv.config();

/* makes sure that the user is logged in before sending the request */
export function authorize(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      res.status(401).json({ msg: "Unauthorized" });
    } else {
      console.log(user);
      req.user = user;
      next();
    }
  })(req, res, next);
}

/* Checks if there are any users with the same username */

export async function checkUsernameOrEmailUnique(req, res, next) {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    let existingUser = null;

    if (id) {
      existingUser = await db.manyOrNone(
        `SELECT id, username, email FROM users
         WHERE (username=$2 OR email=$3) AND id<>$1`,
        [id, username, email]
      );
    } else {
      existingUser = await db.manyOrNone(
        `SELECT username, email FROM users WHERE username=$1 OR email=$2`,
        [username, email]
      );
    }

    if (existingUser.length > 0) {
      const conflictMsg = existingUser.some(user => user.username === username)
        ? "Username already in use"
        : "Email already in use";

      return res.status(409).json({ msg: conflictMsg });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

/* Checks if there are gears or pc with the same name */

export async function checkGearUnique(req, res, next) {
  const { id } = req.params;
  const { series } = req.body;

  try {
    if (id) {
      const existingGear = await db.oneOrNone(
        `SELECT (id, series) FROM gear WHERE series=$1 AND id<>$2`,
        [series, id]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Series already exists" });
      }
    } else {
      const existingGear = await db.oneOrNone(
        `SELECT (id, series) FROM gear WHERE series=$1 `,
        [series]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Series already exists" });
      }
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function checkPcUnique(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    if (id) {
      const existingPc = await db.oneOrNone(
        `SELECT id, name FROM pc WHERE name=$1 AND id<>$2`,
        [name, id]
      );

      if (existingPc) {
        return res.status(409).json({ msg: "PC already exists" });
      }
    } else {
      const existingPc = await db.oneOrNone(
        `SELECT id, name FROM pc WHERE name=$1`,
        [name]
      );

      if (existingPc) {
        return res.status(409).json({ msg: "PC already exists" });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

/* check if there are brands with the same name */

export async function checkBrandUnique(req, res, next) {
  const { id } = req.params;
  const { brand } = req.body;

  try {
    if (id) {
      const existingGear = await db.oneOrNone(
        `SELECT (id, brand) FROM brands WHERE brand=$1 AND id<>$2`,
        [brand, id]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Brand already exists" });
      }
    } else {
      const existingGear = await db.oneOrNone(
        `SELECT (brand) FROM brands WHERE brand=$1`,
        [brand]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Brand already exists" });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

/* check if there are any subscribers with the same mail */

export async function checkNewsletterSubscriberUnique(req, res, next) {
  const { id } = req.params;
  const { email } = req.body;

  try {
    if (id) {
      const existingGear = await db.oneOrNone(
        `SELECT (id, email) FROM newsletter_subscribers WHERE email=$1 AND id<>$2`,
        [email, id]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Subscriber already exists" });
      }
    } else {
      const existingGear = await db.oneOrNone(
        `SELECT (email) FROM newsletter_subscribers WHERE email=$1`,
        [email]
      );

      if (existingGear) {
        return res.status(409).json({ msg: "Subscriber already exists" });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function checkIfItemAlreadyInOrder(req, res, next) {
  const { order } = req.body;

  try {
   const result = await db.manyOrNone(
    `SELECT id FROM cart_products
    WHERE id = ANY($1)
      AND shipping_id IS NOT NULL`,
    [order]
   )

    if (result.length > 0) {
      return res.status(409).json({ msg: "One or more items had been already ordered", result });
    }

    next();
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}
