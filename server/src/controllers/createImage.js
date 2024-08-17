import multer from "multer";
import { db } from "../db.js";
import { unlink } from "node:fs";

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

export async function deleteImage(req, res) {
  try {
    const {image} = req.body;

    if (image) {
    unlink(image, (err) => {
      if (err) {
        console.log(err)
        return res.status(400).json({msg:err})
      }
    });

    res.status(201).json({msg: `${image} deleted`})
   } else {
    res.status(404).json({msg: "file not found"})
   }

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
}
