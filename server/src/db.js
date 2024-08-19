import pgPromise from "pg-promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {
  createEncryptedCCForMockUsers,
  getLastFourDigits,
} from "./controllers/users.js";
import {
  createAltAddress,
  createCC,
  createFaqs,
  createGearDatabase,
  createPCDatabase,
  createTicket,
  createTicketChat,
  createUser,
  createUserLastSeenMessage,
} from "./controllers/startingDb.js";
import { chatBuildPc, chatOrhers, chatShippingIssues } from "./arrays_to_create_database/ticketList.js";

/* Let me use the environment variables */
dotenv.config();

/* I extract the values from the enviornment throught destruture*/
const {
  CARD_HOLDER_1,
  CARD_NUMBER_1,
  EXPIRES_1,
  CVV_1,
  CARD_HOLDER_2,
  CARD_NUMBER_2,
  EXPIRES_2,
  CVV_2,
  PASSWORD_FIRST_USER,
  PASSWORD_SECOND_USER,
  PASSWORD_THIRD_USER,
  DB_USER,
  DB_PASSWORD,
  DB_URL,
  DB_PORT_NUMBER,
  DB_NAME,
} = process.env;

/* Linking the external Postgres database with the server */
const db = pgPromise()(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT_NUMBER}/${DB_NAME}`
);

function imagePath(imgName) {
  return `/uploads/${imgName}`;
}

/* Setting the database by creating the tables and a list of mocking users and products */
async function setupDB() {
  /* using bcrypt to encrypt the users passwords */
  const passwordUser1 = await bcrypt.hash(PASSWORD_FIRST_USER, 10);
  const passwordUser2 = await bcrypt.hash(PASSWORD_SECOND_USER, 10);
  const passwordUser3 = await bcrypt.hash(PASSWORD_THIRD_USER, 10);


  /* using the function extracted from the controller users to encrypt all the credit cards informations */
  const creditCard1 = createEncryptedCCForMockUsers(
    CARD_HOLDER_1,
    CARD_NUMBER_1,
    getLastFourDigits(CARD_NUMBER_1),
    EXPIRES_1,
    CVV_1
  );

  const creditCard2 = createEncryptedCCForMockUsers(
    CARD_HOLDER_2,
    CARD_NUMBER_2,
    getLastFourDigits(CARD_NUMBER_2),
    EXPIRES_2,
    CVV_2
  );

  /* Creating (CREATE) the tables for the database and filling them (INSERT INTO) with some mocking data */
  await db.none(`
    DROP TABLE IF EXISTS last_message;
    DROP TABLE IF EXISTS chat_messages;
    DROP TABLE IF EXISTS tickets;
    DROP TABLE IF EXISTS faqs;
    DROP TABLE IF EXISTS pc;
    DROP TABLE IF EXISTS gear;
    DROP TABLE IF EXISTS users_alternative_address ;
    DROP TABLE IF EXISTS alternative_address ;
    DROP TABLE IF EXISTS users_cards ;
    DROP TABLE IF EXISTS credit_cards ;
    DROP TABLE IF EXISTS users_games ;
    DROP TABLE IF EXISTS games ;
    DROP TABLE IF EXISTS users ;

    CREATE TABLE games(
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employee_id VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL
    );

    CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    avatar_url VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    phone VARCHAR(255) UNIQUE,
    admin BOOLEAN NOT NULL,
    token TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
    );

    CREATE TABLE users_games(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE credit_cards(
    id SERIAL NOT NULL PRIMARY KEY,
    card_holder_name TEXT,
    card_number TEXT,
    last_four_digits TEXT,
    expiration_date TEXT,
    cvv TEXT
    );

    CREATE TABLE users_cards(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    credit_card_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (credit_card_id) REFERENCES credit_cards(id)
    );

    CREATE TABLE alternative_address(
    id SERIAL NOT NULL PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL
    );

    CREATE TABLE users_alternative_address(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (address_id) REFERENCES alternative_address(id)
    );

    CREATE TABLE gear(
    id SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    gear VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    series VARCHAR(255) NOT NULL UNIQUE,
    features TEXT[],
    original_price NUMERIC NOT NULL,
    discount NUMERIC,
    link_info VARCHAR(255),
    stock INT,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
    );

    CREATE TABLE pc(
    id SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    image VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    original_price NUMERIC NOT NULL,
    discount NUMERIC,
    stock INT,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
    );

    CREATE TABLE faqs(
    id SERIAL NOT NULL PRIMARY KEY,
    question TEXT NOT NULL,
    awnser TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
    );

    CREATE TABLE tickets(
    id SERIAL NOT NULL PRIMARY KEY,
    opened_by INT NOT NULL,
    category VARCHAR(255),
    ticket_title VARCHAR(255),
    number_of_messages INT,
    created_at TIMESTAMP DEFAULT NOW(),
    closed_at TIMESTAMP,
    FOREIGN KEY (opened_by) REFERENCES users(id)
    );

    CREATE TABLE chat_messages(
    id SERIAL NOT NULL PRIMARY KEY,
    ticket_id INT NOT NULL,
    author_id INT NOT NULL,
    image TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE last_message(
    id SERIAL NOT NULL PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    last_message INT,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `);

  await createUser(
    "Bredina",
    passwordUser1,
    "schiariti.andrea@gmail.com",
    "Andrea",
    "Schiariti",
    "Italy",
    "Rome",
    "Via le Mani dal Fuoco 42",
    "00100",
    true,
    imagePath("avatar_bredina.png")
  );

  await createUser(
    "Dorothy",
    passwordUser2,
    "oz@gmail.com",
    "Dorothy",
    "Gale",
    "USA",
    "Kansas City",
    "Yellow Brick Road 90210",
    "00100",
    false,
    imagePath("dorothy.webp")
  );

  await createUser(
    "Emvee",
    passwordUser3,
    "emvee@gmail.com",
    "Emvee",
    "K",
    "Italy",
    "Rome",
    "Piazza la bomba e scappa, 60",
    "00100",
    true,
  );

  await createCC(
    creditCard1.cardHolder,
    creditCard1.cardNumber,
    creditCard1.fourDigits,
    creditCard1.expires,
    creditCard1.cvv,
    1
  );

  await createCC(
    creditCard2.cardHolder,
    creditCard2.cardNumber,
    creditCard2.fourDigits,
    creditCard2.expires,
    creditCard2.cvv,
    1
  );

  await createAltAddress("Italy", "Rome", "Via Quella 13", "00100", 1);

  await createGearDatabase();
  await createPCDatabase();
  await createFaqs();

  await createTicket(
    2,
    "build-your-pc",
    "I would like to build an optimized pc for digital paintings",
    chatBuildPc.length
  );

  await createTicketChat(chatBuildPc);

  await createUserLastSeenMessage(1, 1, chatBuildPc.length);
  await createUserLastSeenMessage(1, 2, chatBuildPc.length - 1);

  await createTicket(2, "shipping", "123456 - Delivery is late", chatShippingIssues.length)

  await createTicketChat(chatShippingIssues)

  await createUserLastSeenMessage(2, 1, chatShippingIssues.length - 1)
  await createUserLastSeenMessage(2, 2, chatShippingIssues.length)

  await createTicket(
    2,
    "others",
    "Help for mantainance of a component",
    chatOrhers.length
  )

  await createTicketChat(chatOrhers)

  await createUserLastSeenMessage(3, 1, chatOrhers.length - 1)
  await createUserLastSeenMessage(3, 2, chatOrhers.length)
}

setupDB();

export { db };
