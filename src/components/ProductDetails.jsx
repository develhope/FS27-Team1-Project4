/*Component author Massimo*/
import React from "react";
import { Button } from "./Button";

const ProductDetails = ({ product, onBack }) => {
    if (!product) return null;
  
    const { id, type, name, description, originalPrice, discount, image, gear, brand, series, features } = product;
  
    return (
      <div className="product-details" id={`product-${id}`}>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Type: {type}</p>
        <p>Brand: {brand}</p>
        <p>Series: {series}</p>
        <p>Gear: {gear}</p>
        <p>Features: {features}</p>
        <p>Original Price: $ {originalPrice}</p>
        <p>Discount: $ {discount}</p>
  
        <div className="button-container">
          
          <Button className="back-button" onClick={onBack} text={"Back to list"} />
          <Button className="bottone" text={"Add to Cart"} />
        </div>
      </div>
    );
  };
  
  export default ProductDetails;
