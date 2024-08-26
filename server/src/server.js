import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors"
import {
  addAlternativeAddress,
  addCreditCard,
  checkPassword,
  getCards,
  getUserById,
  getUserByUsername,
  getUsers,
  hardDeleteUser,
  login,
  logout,
  signUp,
  softUserDelete,
  updatePassword,
  updateUser,
} from "./controllers/users.js";
import { authorize, checkBrandUnique, checkGearUnique, checkIfItemAlreadyInOrder, checkNewsletterSubscriberUnique, checkPcUnique, checkUsernameOrEmailUnique } from "./middleware.js";
import "./passport.js";
import multer from "multer";
import fs from "fs";
import { deleteImage, uploadImage } from "./controllers/createImage.js";
import { addBrand, addGear, addPc, deleteBrand, deleteGear, deletePc, getAllBrands, getComputerById, getComputerByName, getComputerList, getGearById, getGearBySeries, getGearList, updateBrand, updateGear, updateGearIncomingStock, updateGearStock, updatePc, updatePcIncomingStock, updatePcStock } from "./controllers/products.js";
import { createFaq, deleteFaq, getFaqs, updateFaq } from "./controllers/faqs.js";
import { addChatAnswer, closeTicket, createLastMessages, createNewTicket, deleteMessage, getAllTickets, getLastMessages, getLastMessagesByUserId, getTicketById, getTicketsByUserId, modifyChatMessage, updateReadMessages } from "./controllers/tickets.js";
import path from "path"
import { addNewsletterSubscriber, deleteNewsletterSubscriber, getNewsletterEmails } from "./controllers/newsletter.js";
import { addProductToUserCart, createNewShipping, deleteCartItem, getAllCartProducts, getAllShipping, getCartByUserId, getShippingById, getShippingsByUserId, updateShippingStatus } from "./controllers/cart.js";

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
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

/* api users related */
app.get("/api/users", getUsers);
app.get("/api/user/id/:id", getUserById)
app.get("/api/user/username/:username", getUserByUsername);
app.get("/api/users/logout", authorize, logout);
app.get("/api/users/cc", getCards);

app.post("/api/users/login", login);
app.post("/api/users/signup", checkUsernameOrEmailUnique, signUp);
app.post("/api/users/address/add", addAlternativeAddress);
app.post("/api/users/cc/add", addCreditCard);
app.post("/api/user/check/:id", checkPassword)

app.put("/api/user/update/:id", checkUsernameOrEmailUnique, updateUser);
app.put("/api/user/update/password/:id", updatePassword)

app.put("/api/user/soft/:id", softUserDelete)

app.delete("/api/user/hard/:id", hardDeleteUser)

/* api products related */
app.get("/api/products/gears", getGearList)
app.get("/api/products/gears/id/:id", getGearById)
app.get("/api/products/gears/series/:series", getGearBySeries)
app.get("/api/products/pc", getComputerList)
app.get("/api/products/pc/id/:id", getComputerById)
app.get("/api/products/pc/name/:name", getComputerByName)

app.post("/api/products/gears/add",checkGearUnique, addGear)
app.post("/api/products/pc/add",checkPcUnique, addPc)

app.put("/api/products/gears/update/:id", checkGearUnique, updateGear)
app.put("/api/products/gears/update/stock/:id", updateGearStock)
app.put("/api/products/gears/update/incoming-stock/:id", updateGearIncomingStock)

app.put("/api/products/pc/update/:id", checkPcUnique, updatePc)
app.put("/api/products/pc/update/stock/:id", updatePcStock)
app.put("/api/products/pc/update/incoming-stock/:id", updatePcIncomingStock)

app.put("/api/products/gears/delete/:series", deleteGear)
app.put("/api/products/pc/delete/:name", deletePc)

app.get("/api/brands", getAllBrands)
app.post("/api/brands/add", checkBrandUnique ,addBrand)
app.put("/api/brands/update/:id", checkBrandUnique, updateBrand)
app.put("/api/brands/delete/:id", deleteBrand)

/* api faqs related */
app.get("/api/faqs", getFaqs)
app.post("/api/faqs/add", createFaq)
app.put("/api/faqs/:id", updateFaq)
app.put("/api/faqs/delete/:id", deleteFaq)

/* api ticket related */
app.get("/api/tickets", getAllTickets)
app.get("/api/tickets/user/:id", getTicketsByUserId)
app.get("/api/ticket/:id", getTicketById)

app.post("/api/ticket/create", createNewTicket)
app.post("/api/ticket/add/:ticketId", addChatAnswer)

app.put("/api/ticket/update/:messageId", modifyChatMessage)
app.put("/api/ticket/delete/:messageId", deleteMessage)
app.put("/api/ticket/close/:id", closeTicket)

app.get("/api/last", getLastMessages)
app.get("/api/last/user/:id", getLastMessagesByUserId)
app.post("/api/last/add", createLastMessages)
app.put("/api/last/:ticketId", updateReadMessages)

/* api newsletter related */
app.get("/api/newsletter/subscribers", getNewsletterEmails)
app.post("/api/newsletter/subscriber/add", checkNewsletterSubscriberUnique, addNewsletterSubscriber)
app.put("/api/newsletter/subscriber/delete/:id", deleteNewsletterSubscriber)

/* api cart related */
app.get("/api/cart/all-products", getAllCartProducts)
app.get("/api/cart/user/:id", getCartByUserId)
app.post("/api/cart/add/user/:id", addProductToUserCart)
app.put("/api/cart/delete-item/:id", deleteCartItem)


app.get("/api/shippings", getAllShipping)
app.get("/api/shippings/user/:id", getShippingsByUserId)

app.get("/api/shipping/:id", getShippingById)
app.post("/api/shipping/create", checkIfItemAlreadyInOrder, createNewShipping)
app.put("/api/shipping/update-status/:id", updateShippingStatus)

/* api to upload images */
app.post(
  "/api/upload",
  upload.single("image"),
  uploadImage
);

app.delete("/api/upload/delete", deleteImage)

app.listen(port, () => {
  console.log(`Server API listening on port ${port}`);
});
