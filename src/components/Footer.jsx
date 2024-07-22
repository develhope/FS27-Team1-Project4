import React, { useState } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import facebook from '../images/facebook.png';
import instragram from '../images/instragram.png';
import tiktok from '../images/tiktok.png';
import twitter from '../images/twitter.png';
import whatsapp from '../images/whatsapp.png';
import youtube from '../images/youtube.png';
import logo from '../images/logo.png'
const Footer = () => {
  const [activeSection, setActiveSection] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 320px)' });
  const iMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const footerLinks = [
    { to: '/', text: 'Home' },
    { to: '/terms', text: 'Termini di Servizio' },
    { to: '/mail', text: 'Mail' }
  ];
  const gamingPc=[
    {to: "/", text: 'Gaming Portatile'},
    {to: "/", text: 'Gaming Fisso'},
    {to: "/", text: 'PC Gaming i9'},
    {to: "/", text: 'PC Gaming i7'},
    {to: "/", text: 'Workstation Grafiche'},
  ]
  const footerSection = [
    {to: "/", text: 'Server per Aziende'},
    {to: "/", text: 'Server per Studio'},
    {to: "/", text: 'Professionale PC'},
    {to: "/", text: '3D Rendering PC'},
    {to: "/", text: 'Workstation Grafiche'},
  ]
  return (
    <footer className="relative footer">
      <div className="footer-section company-info">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <address>
          Società: Classe Fullstack27 s.p.a<br />
          Sede: Via Santa Maria Delle Grazie 183, Nocera Superiore 84015<br />
          Partita IVA: IT0899XXXXX<br />
          Tel: 3420541376
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
        <h4 onClick={() => toggleSection('gaming')} className="toggle-button">GAMING PC</h4>
        {(!isMobile || activeSection === 'gaming') && (!iMobile || activeSection === 'gaming') &&(
          <ul>
            {gamingPc.map((link,index)=>(
              <li key={index}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="footer-section links">
        <h4 onClick={() => toggleSection('professional')} className="toggle-button">PROFESSIONAL PC</h4>
        {(!isMobile || activeSection === 'professional') && (!iMobile || activeSection === 'professional') &&(
          <ul>
           {footerSection.map((link,index)=>(
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
          Classe Fullstack27 s.p.a è una società specializzata nella distribuzione e vendita di componenti di pc e vendita di computer
        </p>
        <p>
          Fondata nel 2024, Classe Fullstack27 s.p.a è una società di ragazzi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
