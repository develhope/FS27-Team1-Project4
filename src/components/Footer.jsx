/* Component author Massimo */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { CiYoutube, CiFacebook, CiHome } from "react-icons/ci";
import { SlArrowUp } from "react-icons/sl";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/nebula-tech-1-logo-b.png";
import { MetalBg } from "./MetalBg";
import { NavbarBorder } from "./NavbarBorder";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const [activeSection, setActiveSection] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 320px)" });
  const iMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };
  const gamingPc = [
    { to: "/products", text: "Products" },
    { to: "/computer", text: "Pc" },
  ];
  const footerSection = [
    { to: "/contact", text: "Contact us" },
    { to: "/faq", text: "Faq" },
    { to: "/tickets", text: "Open Ticket" },
  ];
  return (
    <>
      <footer className="relative footer">
        <div className="min-h-full py-px bg-gradient box-border w-full">
          <div className="absolute top-0 left-0 w-full rotate-180">
            <NavbarBorder />
          </div>
          <MetalBg>
            <div className="flex footer-contect">
              <div className="company-logo-container">
                <img src={logo} alt="Company Logo" className="company-logo" />
              </div>
              <div className="footer-section links products-section">
                <h1
                  onClick={() => toggleSection("gaming")}
                  className="toggle-button"
                >
                  PRODUCTS
                  <span
                    className={`arrow ${
                      activeSection === "gaming" ? "active" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </h1>
                {(!isMobile || activeSection === "gaming") &&
                  (!iMobile || activeSection === "gaming") && (
                    <ul>
                      {gamingPc.map((link, index) => (
                        <li key={index}>
                          <Link to={link.to}>{link.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              {/* Contacts Section */}
              <div className="footer-section links">
                <h1
                  onClick={() => toggleSection("professional")}
                  className="toggle-button"
                >
                  CONTACTS
                  <span
                    className={`arrow ${
                      activeSection === "professional" ? "active" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </h1>
                {(!isMobile || activeSection === "professional") &&
                  (!iMobile || activeSection === "professional") && (
                    <ul>
                      {footerSection.map((link, index) => (
                        <li key={index}>
                          <Link to={link.to}>{link.text}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>

              {/* Social Links Section */}
              <div className="footer-section misc-links">
                <div className="text-2xl">
                  <h1>SOCIAL</h1>
                </div>
                <div className="flex social-icons">
                  <CiYoutube />
                  <CiFacebook />
                  <FaInstagram />
                  <FaWhatsapp />
                  <FaXTwitter />
                </div>
              </div>

              {/* Company Description Section */}
              <div className="footer-section company-description">
                <address>
                  Society: Nebula Tech 1 s.p.a
                  <br />
                  Site: Via Santa Maria Delle Grazie 183, Nocera Superiore 84015
                  <br />
                  VAT number: IT0899XXXXX
                  <br />
                  Telephone Number: 3420541376
                </address>
                <div className="flex flex-col">
                  <Link to="/terms-of-service" className="terms-link">
                    Terms of Service
                  </Link>
                  <Link to="/privacy-terms" className="terms-link">
                    Privacy
                  </Link>
                </div>
              </div>

              {/* Scroll Button Moved Below the Content */}
              <div className="scroll-button-container">
                <button onClick={scrollToTop} className="scroll-to-top-btn">
                  <SlArrowUp />
                </button>
              </div>
            </div>
          </MetalBg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
