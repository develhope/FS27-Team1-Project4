import { db } from "../db.js";
import Joi from "joi"

const faqSchema = Joi.object({
  question: Joi.string().required(),
  awnser: Joi.string().required()
})

export async function getFaqs(req, res) {
  try {
    const faqs = await db.manyOrNone(
      `SELECT id, question, awnser
      FROM faqs
      WHERE deleted_at IS NULL`
    )

    res.status(200).json(faqs)

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error });
  }
}

export async function createFaq(req, res) {
  const {question, awnser} = req.body

  try {
    const validatedFaq = faqSchema.validate({ question, awnser})

    if (validatedFaq.error) {
      return res.status(409).json({msg: validatedFaq.error.details[0].message})
    }

    const newFaq = await db.one(
      `INSERT INTO faqs (question, awnser)
      VALUES ($1, $2)
      RETURNING *`,
      [question, awnser]
    )

    res.status(201).json({msg: `faq ${newFaq.id} created`, faq: newFaq})
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: error });
  }
}

export async function updateFaq(req, res) {
  const {id} = req.params
  const {question, awnser} = req.body

  try {

    const validatedFaq = faqSchema.validate({ question, awnser})

    if (validatedFaq.error) {
      return res.status(409).json({msg: validatedFaq.error.details[0].message})
    }

    const newFaq = await db.one(
      `UPDATE faqs
      SET question=$2, awnser=$3
      WHERE id=$1
      RETURNING *`,
      [Number(id), question, awnser]
    )

    res.status(201).json({msg: `faq ${id} updated`, faq: newFaq})
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: error });
  }
}

export async function deleteFaq(req, res) {
  const {id} = req.params

  try {
    const deletedFaq = await db.one(
      `UPDATE faqs
      SET deleted_at=NOW()
      WHERE id=$1
      RETURNING *`, [Number(id)]
    )

    res.status(201).json({msg: `Faq ${id} deleted`, faq:deletedFaq})
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: error });
  }
}
