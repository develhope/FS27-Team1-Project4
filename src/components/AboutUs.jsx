import React from 'react';
import '../css/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <header className="header-section">
        <h1>The foremost computer expert in Europea</h1>
        <p>We specialize in custom-built PCs and laptops.</p>
      </header>
      
      <section className="about-section">
        <h2>About Us</h2>
        <h3>We've been operating in this field for 2 years</h3>
        <h4>We deliver a computer every 1 hour.</h4>
        <p>
        Nebula Tech 1 stands as Europe's top IT systems integrator, specializing in building custom 
        PCs and laptops. Our mission is to deliver the highest-performance systems for enthusiasts, 
        gamers, and professionals alike.
        </p>
        <p>
        Established in 2022, we operate in 11 languages and supply computers to more than 30 countries across Europe. 
        Our offices are located in Germany, the Netherlands, and the United Kingdom, with additional branches in Austria and Italy. In 2024, we 
        launched a cutting-edge center in Heerlen, Netherlands.
        </p>
      </section>

      <section className="recognition-section">
        <h2>WE HAVE GAINED RESPECT AND RECOGNITION!</h2>
        <div className="recognition-logos">
          <img src="src\images\microsoft-partner-logo.png" alt="Microsoft Partner" />
          <img src="src\images\intel_partner_logo.png" alt="Intel Partner" />
          <img src="src\images\amd-hero-logo.png" alt="AMD Partner" />
          <img src="src\images\nvidia_elite_logo.png" alt="NVIDIA Partner" />
          </div>
        <p>Nebula Tech 1 holds certification as an Nvidia Partner, reflecting our dedication to skill 
          and continuous education. Additionally, we are a trusted Intel Premier provider, underscoring 
          our commitment to offering the latest in Intel technology and quality.</p>
      </section>


      <section className="certification-section">
        <h2>WE ARE ISO 9001, ISO 14001, AND ISO 45001 CERTIFIED!</h2>
        <p>
        ISO is a globally recognized standards organization, comprised of representatives from national standards bodies around the world. 
        We are proud to announce that we are UKAS certified for the following standards.
        </p>
        <ul>
          <li>ISO 9001: Quality</li>
          <li>ISO 14001: Environmental Management</li>
          <li>ISO 45001: Health and Safety Management System</li>
        </ul>
      </section>

      <footer className="footer-section-ab">
        <h2>We offer shipping throughout Europe.</h2>
        <p>
         Every computer you buy from us comes with low-cost phone technical support, top-tier customer service, and advanced troubleshooting assistance.
        </p>
      </footer>
    </div>
  );
}

export default AboutUs;
