import React, { useState } from "react";
import { MetalBg } from "./MetalBg";
import { Button } from "./Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

export function Builded() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      title: "Player: Two Prime",
      backgroundImage: "/public/PC1.png",
      description: "H5 Elite RTX 4070 Ti SUPER Prebuilt Gaming PC",
      originalPrice: "$2199,00",
      discountedPrice: "$1899,00",
    },
    {
      title: "Acer Predator Orion 7000",
      backgroundImage: "/public/pc2.png",
      description: "Intel Core i7-13900KF 32GB RTX 4090 SSD 1TB+2TB Windows 11",
      originalPrice: "$3599,99",
      discountedPrice: "$3299,99",
    },
    {
      title: "Lenovo Legio T5",
      backgroundImage: "/public/pc3.png",
      description:
        "Intel Core i7-13700F 16GB Geforce RTX 4070 Ti 1TB Windows 11",
      originalPrice: "$2599,99",
      discountedPrice: "$2350,00",
    },
    {
      title: "MSI MAG Codex 5",
      backgroundImage: "/public/pc4.png",
      description:
        "PC Desktop Gaming MSI MAG Codex 5 13NUC5-1649IT – Intel Core i5-13400F, 16GB(8GB*2), GeForce RTX 4060, SSD 1TB, Windows 11 Home",
      originalPrice: "$1599,99",
      discountedPrice: "$1448,99",
    },
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="builded-container">
      <div className="carousel-wrapper">
        <MetalBg />
        <div className="card-nav-buttons">
          {cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setCurrentCard(index)}
              className={currentCard === index ? "active" : ""}
            >
              {card.title}
            </button>
          ))}
        </div>
        <div className="builded-carousel">
          <div className="card-container">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card-content ${
                  currentCard === index ? "active" : "hidden"
                }`}
              >
                <div className="card-background"></div>
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${card.backgroundImage})` }}
                ></div>
                <div className="card-info">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-description">{card.description}</p>
                  <hr className="card-divider" />
                  <div className="card-price-container">
                    <span className="card-original-price">
                      {card.originalPrice}
                    </span>
                    <span className="card-discounted-price">
                      {card.discountedPrice}
                    </span>
                    <Button text="Buy Now" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="arrow left-arrow" onClick={prevCard}>
            <FaChevronLeft />
          </button>

          <button className="arrow right-arrow" onClick={nextCard}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
