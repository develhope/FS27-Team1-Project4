/* Component Author Andrea */

import { useEffect, useState } from "react";
import smallBanner from "../assets/contact_small.png";
import bigBanner from "../assets/contact_big.png";
import faq from "../assets/faq_violet.png";
import shipping from "../assets/space-travel_violet.png";
import buildPc from "../assets/build_pc_icon.png";
import assistant from "../assets/assistant_violet.png";
import { Link } from "react-router-dom";
import { useResponsiveWidth } from "../custom-hooks/useResponsiveWidth";

export function Contact() {
  const {screenWidth} = useResponsiveWidth()

  const contactLink = [
    {
      img: faq,
      name: "FAQ",
      description: "Where you can find all the most common questions",
      path: "/faq",
    },
    {
      img: buildPc,
      name: "Build Your PC",
      description:
        "Recieve help from one of our operators to build the best pc that suits all your needs!",
      path: "/create-ticket/build-your-pc",
    },
    {
      img: shipping,
      name: "Shipping",
      description:
        "Having trouble with one of your orders? Let one of our operators knows so that they can lend you a hand to solve the problem!",
      path: "/create-ticket/shipping",
    },
    {
      img: assistant,
      name: "Other Problems",
      description:
        "Are you having an issue that we didn't take in consideration? Let our operators know so that they can try to do something about it!",
      path: "/create-ticket/other",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between relative contact">
      <div className="flex flex-col items-center relative banner">
        <img src={screenWidth < 1280 ? smallBanner : bigBanner} alt="assistance immage" />
        <div className="flex flex-col items-center contact-header">
          <div className="flex flex-col items-center header-title">
            <h3>DO YOU NEED ASSISTANCE? </h3>
            <h4>WE'LL BE PLEASED TO HELP YOU!</h4>
          </div>
          <h5>
            You can browse our FAQ or get in contact with one of our
            operators. They will awnser back as soon as possible!
          </h5>
        </div>
      </div>
      <div className="grid contact-links-container">
        {contactLink.map((contact, index) => {
          return (
            <Link to={contact.path} className="flex contact-link" key={index}>
              <div className="flex justify-center items-center image-container">
                <img src={contact.img} alt="link icon" />
              </div>
              <div className="flex flex-col items-center justify-center link-details">
                <h4>{contact.name}</h4>
                <p>{contact.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
