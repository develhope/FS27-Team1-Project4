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
  const { id, username, email } = req.body;

  try {
    const existingUser = await db.manyOrNone(
      `SELECT id, username, email FROM users WHERE username=$1 OR email=$2`,
      [username, email]
    );

    if (existingUser) {
      for (const user of existingUser) {
        if (user.id !== id) {
          return res.status(409).json({
            msg: `${
              user.username === username ? "Username" : "Email"
            } already in use`,
          });
        }
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

/* Checks if there are gears or pc with the same name */

export async function checkGearUnique(req, res, next) {
  const { id, series } = req.body;

  try {
    const existingGear = await db.oneOrNone(
      `SELECT (id, series) FROM gear WHERE series=$1 AND id<>$2`,
      [series, id]
    );

    if (existingGear) {
      return res.status(409).json({ msg: "Series already exists" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}

export async function checkPcUnique(req, res, next) {
  const { id, name } = req.body;

  try {
    const existingPc = await db.oneOrNone(
      `SELECT id, name FROM pc WHERE name=$1 AND id<>$2`,
      [name, id]
    );

    if (existingPc) {
      return res.status(409).json({ msg: "PC already exists" });
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
