import {db} from "../db.js"
import { selectUserById } from "./users.js"

export async function gameCompleted(req, res) {
  const {id} = req.params

  try {

    const userId = await db.one(
      `SELECT user_id AS "id"
      FROM users_games
      WHERE game_id=$1`,
      [Number(id)]
    )

    if (!userId) {
      return res.status(404).json({msg: "User not found"})
    }

     await db.none(
      `UPDATE games
      SET completed = true
      WHERE id=$1`,
      [Number(id)]
    )

    const user = await selectUserById(userId.id)

    res.status(200).json({msg: `${user.username}'s game was updated`, user})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}
