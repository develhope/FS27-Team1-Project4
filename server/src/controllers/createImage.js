import multer from "multer";
import { db } from "../db.js";

export async function uploadImage(req, res) {
  try {
    const fileName = req.file?.path;

    if (fileName) {
      try {
        res
          .status(201)
          .json({ msg: "Image added succesfully", path: fileName });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
      }
    } else {
      res.status(400).json({ msg: "Image failed to upload" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}
