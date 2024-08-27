import React, { useState, useEffect } from "react";
import { MetalBg } from "./MetalBg";
import { Button } from "./Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRender } from "./ChatProvider";

export function Builded() {
  const [currentCard, setCurrentCard] = useState(0);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user_nt1"));
  const { onRender } = useRender();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/pc");
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Errore nel recupero dei prodotti:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const addToCart = async (product) => {
    if (user) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/cart/add/user/" + user.id,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pcId: product.id,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add product to cart");
        }

        const result = await response.json();
        console.log("Product added to cart:", result);
        alert("Product added to cart");
        onRender();
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      navigate("/login");
    }
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
              {card.name}
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
                onClick={() => addToCart(card)}
              >
                <div className="card-background"></div>
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${card.image})` }}
                ></div>
                <div className="card-info">
                  <h2 className="card-title">{card.name}</h2>
                  <p className="card-description">{card.description}</p>
                  <hr className="card-divider" />
                  <div className="card-price-container">
                    <span className="card-original-price">
                      €{card.originalPrice}
                    </span>
                    <span className="card-discounted-price">
                      €{card.discount}
                    </span>
                    <Button
                      text="Buy Now"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(card);
                      }}
                    />
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
