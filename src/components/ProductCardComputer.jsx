import React from "react";
import { Button } from "./Button";

const ProductCardComputer = ({ id, type, name, description, originalPrice, discount, image, }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Type: {type}</p>
      <p>Original Price: ${originalPrice}</p>
      <p>Discount:$ {discount}</p>
      <Button className="bottone" text="Add to Cart" />
    </div>
  );
};

export default ProductCardComputer;