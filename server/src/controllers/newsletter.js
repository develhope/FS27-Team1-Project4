import { db } from "../db.js"
import Joi from "joi"

const newSubscriberSchema = Joi.object({
  email: Joi.string().email().required()
})

export async function getNewsletterEmails (req, res) {
  try {
    const subscribers = await db.manyOrNone(
      `SELECT
        id,
        email,
        created_at as "createdAt"
      FROM newsletter_subscribers
      WHERE deleted_at IS NULL`
    )

    res.status(200).json(subscribers)
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function deleteNewsletterSubscriber (req, res) {
  const {id} = req.params

  try {
   const subscriber = await db.none(
      `UPDATE newsletter_subscribers
      SET deleted_at = NOW()
      WHERE id=$1
      RETURNING *`,
      [id]
    )

    if (subscriber) {
    res.status(200).json({msg: "subscriber has been deleted"})
    } else {
      res.status(404).json({msg: "subscriber not found"})
    }

  } catch (error){
    console.log(error)
    res.status(500).json({msg: error})
  }
}

export async function addNewsletterSubscriber (req, res) {
  const { email } = req.body

  try {

    const subscriberValidation = newSubscriberSchema.validate(req.body)

    if (subscriberValidation.error) {
      return res.status(400).json({msg: subscriberValidation.error.details[0].message})
    }

    const newSubscriber = await db.one(
      `INSERT INTO newsletter_subscribers (email)
      VALUES ($1)
      RETURNING email`,
    [email])

    res.status(201).json({msg:`${newSubscriber.email} added to the newsletter subscribers`})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: error})
  }
}
