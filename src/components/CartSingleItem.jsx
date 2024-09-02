/* Component Author Andrea */

import { useFetch } from "../custom-hooks/useFetch";
import { Button } from "./Button";

export function CartSingleItem({
  product,
  shipping = false,
  checkbox,
  index,
  checkboxHandler,
  onRefresh,
}) {
  const [onRemove, removeData, removeError] = useFetch(
    `cart/delete-item/1`,
    "PUT"
  );

  async function handleRemoveItem(productId) {
    try {
      await onRemove({}, `cart/delete-item/${productId}`);

      if (removeError) {
        alert(removeError)
        throw new Error(removeError);
      }

      alert("Item removed succesfully from cart")

      await onRefresh()

    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  return (
    <div className="flex items-center admin-product">
      <div className="flex justify-center items-center product-image-container">
        {product.image && (
          <img src={"http://localhost:3000" + product.image} alt="" />
        )}
      </div>
      <div className="flex flex-col justify-between items-center admin-product-info">
        <div className="flex items-center justify-center name">
          <h3>{product.series ? product.series : product.name}</h3>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="type-product">
            <p>{product.type}</p>
          </div>
          <div className="brand-product">
            <p>{product.brand}</p>
          </div>
          <div className="price-product">
            <p className={product.discount ? "discounted-price" : ""}>
              {product.originalPrice.toFixed(2) + " $"}
            </p>
            <p className="product-discount">
              {product.discount ? product.discount.toFixed(2) + " $" : ""}
            </p>
          </div>
        </div>
      </div>
      {!shipping && (
        <div className="flex flex-col justify-between items-center cart-managment">
          <input
            type="checkbox"
            name="checkbox"
            index="checkbox"
            checked={checkbox[index] || false}
            onChange={() => checkboxHandler(index, product.id)}
          />
          <div className="remove-item" onClick={() => handleRemoveItem(product.id)}>
            <Button text={"Remove"} />
          </div>
        </div>
      )}
    </div>
  );
}
