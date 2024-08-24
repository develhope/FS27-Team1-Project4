import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import facebook from '../images/facebook.png';
import instragram from '../images/instragram.png';
import tiktok from '../images/tiktok.png';
import twitter from '../images/twitter.png';
import whatsapp from '../images/whatsapp.png';
import youtube from '../images/youtube.png';
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
    { to: '/terms', text: 'Terms of Service' },
    { to: '/mail', text: 'Mail' }
  ];
  const gamingPc = [
    { to: "/", text: 'Portable Gaming' },
    { to: "/", text: 'Fixed Gaming' },
    { to: "/", text: 'PC Gaming i9' },
    { to: "/", text: 'PC Gaming i7' },
    { to: "/", text: 'Workstation Grafiche' },
  ];
  const footerSection = [
    { to: "/", text: 'Servers for Business' },
    { to: "/", text: 'Server for Studio' },
    { to: "/", text: 'Professionale PC' },
    { to: "/", text: '3D Rendering PC' },
    { to: "/", text: 'Workstation Grafiche' },
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
                  <a href="#"><img src={facebook} alt="Facebook" /></a>
                  <a href="#"><img src={instragram} alt="Instagram" /></a>
                  <a href="#"><img src={twitter} alt="Twitter" /></a>
                  <a href="#"><img src={youtube} alt="Youtube" /></a>
                  <a href="#"><img src={whatsapp} alt="Whatsapp" /></a>
                  <a href="#"><img src={tiktok} alt="TikTok" /></a>
                </div>
              </div>
              <div className="footer-section links">
                <h1 onClick={() => toggleSection('gaming')} className="toggle-button">
                  GAMING PC
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
                  PROFESSIONAL PC
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
