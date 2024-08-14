import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./components/Home";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { MainWebpageContainer } from "./components/MainWebpageContainer";
import { OpeningPage } from "./components/OpeningPage";
import { Deep } from "./components/Deep";
import { Contact } from "./components/Contact";
import { ContactFAQ } from "./components/ContactFAQ";
import { ContactCreateTicket } from "./components/ContactCreateTicket";
import { ContactChat } from "./components/ContactChat";
import { ContactsTicketList } from "./components/ContactTicketsList";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="fixed h-screen w-screen overflow-hidden App">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 object-cover w-full h-full z-[-2]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="opacity-background"></div>
      </div> */}
      <Routes>
        <Route path="/" element={<MainWebpageContainer />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<ContactFAQ />} />
          <Route
            path="create-ticket/:category"
            element={<ContactCreateTicket />}
          />
          <Route path="tickets" element={<ContactsTicketList />} />
        </Route>
        <Route path="access" element={<OpeningPage />} />
        <Route path="deep" element={<Deep />}>
          <Route
            index
            element={
              <img
                src="./src/assets/logo-hacker-grey.png"
                alt="logo hacker"
                className="logo-hacker"
              />
            }
          />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
