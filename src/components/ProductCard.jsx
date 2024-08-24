import React from "react";
import { Button } from "./Button";

const ProductCard = ({ name, description, originalPrice, discount, imageUrl, onClick }) => {
    return (
        <div className="product-card" onClick={onClick}>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{description}</p>
            <p>
                <span className="original-price">Original Price: $ {originalPrice}</span></p>
               <p> <span className="discount"> Discount: $ {discount}</span>
            </p>
            <Button className="bottone" text={"Add to Cart"} />
        </div>
    );
};

export default ProductCard;
