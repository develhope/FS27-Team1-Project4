import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors"
import {
  addAlternativeAddress,
  addCreditCard,
  getCards,
  getUserByUsername,
  getUsers,
  hardDeleteUser,
  login,
  logout,
  signUp,
  softUserDelete,
  updateUser,
} from "./controllers/users.js";
import { authorize, checkGearUnique, checkPcUnique, checkUsernameOrEmailUnique } from "./middleware.js";
import "./passport.js";
import multer from "multer";
import fs from "fs";
import { uploadImage } from "./controllers/createImage.js";
import { addGear, addPc, deleteGear, deletePc, getComputerByName, getComputerList, getGearBySeries, getGearList, updateGear, updateGearStock, updatePc, updatePcStock } from "./controllers/products.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const port = process.env.API_PORT_NUMBER;

/* Adding the images folder and managing the uploads */
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

/* api users related */
app.get("/api/users", getUsers);
app.get("/api/user/:username", getUserByUsername);
app.get("/api/users/logout", authorize, logout);
app.get("/api/users/cc", getCards);

app.post("/api/users/login", login);
app.post("/api/users/signup", checkUsernameOrEmailUnique, signUp);
app.post("/api/users/address/add", addAlternativeAddress);
app.post("/api/users/cc/add", addCreditCard);

app.put("/api/user/:username/update", checkUsernameOrEmailUnique, updateUser);

app.patch("/api/user/:username/soft", softUserDelete)

app.delete("/api/user/:username/hard", hardDeleteUser)

/* api products related */
app.get("/api/products/gears", getGearList)
app.get("/api/products/gears/:series", getGearBySeries)
app.get("/api/products/pc", getComputerList)
app.get("/api/products/pc/:name", getComputerByName)

app.post("/api/products/gears/add",checkGearUnique, addGear)
app.post("/api/products/pc/add",checkPcUnique, addPc)

app.put("/api/products/gears/:series/update", checkGearUnique, updateGear)
app.put("/api/products/gears/:series/update/stock", updateGearStock)

app.put("/api/products/pc/:name/update", checkPcUnique, updatePc)
app.put("/api/products/pc/:name/update/stock", updatePcStock)

app.put("/api/products/gears/:series/delete", deleteGear)
app.put("/api/products/pc/:name/delete", deletePc)


/* api to upload images */
app.post(
  "/api/upload",
  upload.single("image"),
  uploadImage
);

app.listen(port, () => {
  console.log(`Server API listening on port ${port}`);
});
