import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import logo from '../assets/nebula-tech-1-logo-b.png';
import { MetalBg } from "./MetalBg";
import { NavbarBorder } from './NavbarBorder';

const Footer = () => {
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 320px)' });
  const iMobile = useMediaQuery({ query: '(max-width: 1280px)' });

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const footerLinks = [
    { to: '/', text: 'Home' },
    { to: '/terms-of-service', text: 'Terms of Service' },
    
  ];
  const gamingPc = [
    { to: "/products", text: 'Products' },
    { to: "/computer", text: 'Assembled Computers' },
    { to: "/products", text: 'Peripherals' },
  ];
  const footerSection = [
    { to: "/contact", text: 'Contact us' },
    { to: "/faq", text: 'Faq' },
    { to: "/tickets", text: 'Opend Ticket' },
  ];

  return (
    <>
      <footer className="relative footer">
        <div className='min-h-full py-px bg-gradient box-border w-full'>
          <div className='absolute top-0 left-0 w-full rotate-180'>
            <NavbarBorder />
          </div>

          <MetalBg>
            <div className='flex footer-contect'>
              <div className="footer-section company-info">
                <img src={logo} alt="Company Logo" className="company-logo" />
                <address>
                Society: Nebula Tech 1 s.p.a<br />
                Site: Via Santa Maria Delle Grazie 183, Nocera Superiore 84015<br />
                VAT number: IT0899XXXXX<br />
                Telephone Number: 3420541376
                </address>
                <div className="flex social-icons">
                <CiYoutube />
                <CiFacebook />
                <FaInstagram />
                <CiTwitter />
                <FaWhatsapp />
                </div>
              </div>
              <div className="footer-section links">
                <h1 onClick={() => toggleSection('gaming')} className="toggle-button">
                 PRODUCTS
                  <span className={`arrow ${activeSection === 'gaming' ? 'active' : ''}`}>&#9660;</span>
                </h1>
                {(!isMobile || activeSection === 'gaming') && (!iMobile || activeSection === 'gaming') && (
                  <ul>
                    {gamingPc.map((link, index) => (
                      <li key={index}>
                        <Link to={link.to}>{link.text}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="footer-section links">
                <h1 onClick={() => toggleSection('professional')} className="toggle-button">
                CONTACTS
                  <span className={`arrow ${activeSection === 'professional' ? 'active' : ''}`}>&#9660;</span>
                </h1>
                {(!isMobile || activeSection === 'professional') && (!iMobile || activeSection === 'professional') && (
                  <ul>
                    {footerSection.map((link, index) => (
                      <li key={index}>
                        <Link to={link.to}>{link.text}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="footer-section misc-links">
                <ul>
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.to}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-section company-description">
                <p>
                Nebula Tech 1 s.p.a is a company specialized in the distribution and sale of PC components and computer sales                </p>
                <p>
                Founded in 2024, Nebula Tech 1 s.p.a is a company of young people
                </p>
              </div>
            </div>
          </MetalBg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
