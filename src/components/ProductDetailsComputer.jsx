import React from "react";
import { Button } from "./Button";


const ProductDetailsComputer = ({ product, onBack }) => {
  if (!product) return null;

  const { id, type, name, description, originalPrice, discount, image } = product;

  return (
    <div className="product-details" id={`product-${id}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Type: {type}</p>
      <p>Original Price: ${originalPrice}</p>
      <p>Discount: ${discount}</p>

      <div className="button-container">
        <Button className="bottone" text={"Add to Cart"} />
        <Button className="back-button" onClick={onBack} text={"Back to list"} />
      </div>
    </div>
  );
};

export default ProductDetailsComputer;
