import React from "react";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";
import { useLocalUser } from "../custom-hooks/useLocalUser";

const ProductCardComputer = ({ id, type, name, description, originalPrice, discount, image }) => {
  const { user } = useLocalUser();
  const [onAddCart, addData, addError] = useFetch("cart/add/user/" + user.id, "POST");

  async function handleAddCart() {
    await onAddCart({ pcId: id });

    if (addError) {
      alert(addError);
      throw new Error(addError);
    }

    alert(`Item ${name} added to cart`);
  }

  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Type: {type}</p>
      <p>Original Price: ${originalPrice}</p>
      <p>Discount: ${discount}</p>
      <div onClick={(event) => { event.stopPropagation(); handleAddCart(); }}>
        <Button className="bottone" text="Add to Cart" />
      </div>
    </div>
  );
};

export default ProductCardComputer;
