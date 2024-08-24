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
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { AdminHome } from "./components/AdminHome";
import { AdminMenu } from "./components/AdminMenu";
import { AdminCreateProducts } from "./components/AdminCreateProducts";
import { AdminProductsList } from "./components/AdminProductsList";
import { AdminSingleProductGear } from "./components/AdminSingleProductGear";
import { AdminSingleProductPc } from "./components/AdminSingleProductPc";
import Page from "./components/Page";
import PageComputer from "./components/PageComputer";
import { EditProfile } from "./components/EditProfile";
import { UserProfile } from "./components/UserProfile";
import { CartUser } from "./components/CartUser";


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
        <Route path="products" element={<Page/>}/>
        <Route path="computer" element={<PageComputer/>}/>
          <Route path="login" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<ContactFAQ />} />
          <Route
            path="create-ticket/:category"
            element={<ContactCreateTicket />}
          />
          <Route path="tickets" element={<ContactsTicketList />} />
          <Route path="tickets/:id" element={<ContactChat />} />
          <Route path="admin" element={<AdminHome />}>
            <Route index element={<AdminMenu />} />
            <Route path="add-product/:type" element={<AdminCreateProducts />} />
            <Route path="products-list" element={<AdminProductsList />} />
            <Route path="product/gear/:id" element={<AdminSingleProductGear />} />
            <Route path="product/pc/:id" element={<AdminSingleProductPc />} />
          </Route>
          <Route path="cart" element={<CartUser />} />
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
