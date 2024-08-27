import passport from "passport";
import passportJWT from "passport-jwt";
import { db } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const { SECRET } = process.env;

if (!SECRET) {
  throw new Error("SECRET environment variable is not defined")
}

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const user = await db.oneOrNone(
        `
        SELECT * FROM users WHERE id=$1
        `,
        [payload.id]
      );

      try {
        return user ? done(null, user) : done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);
