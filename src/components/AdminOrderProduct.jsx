/* Component Author Andrea */

import { useEffect, useState } from "react";

import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";

export function AdminOrderProduct({ product, refresh, type }) {
  const [orderedStock, setOrderedStock] = useState(0);
  const [checkArrived, setCheckArrived] = useState(false);

  const [onOrder, orderData, orderError] = useFetch(
    `products/${type}/update/incoming-stock/${product.id}`,
    "PUT"
  );
  const [onArrived, arrivedData, arrivedError] = useFetch(
    `products/${type}/update/stock/${product.id}`,
    "PUT"
  );

  useEffect(() => {
    console.log(
      "stock:" + product.stock,
      "incoming stock:" + product.incomingStock
    );
  }, []);

  useEffect(() => {
    if (checkArrived) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "");
  }, [checkArrived]);

  async function handleOrder() {
    console.log("clicked");
    if (orderedStock === 0) {
      return;
    }

    try {
      await onOrder({
        stock: orderedStock + product.incomingStock,
      });

      if (orderError) {
        alert(orderError.msg);
        throw new Error(orderError.msg);
      }

      alert(`${product.series ? product.series : product.name} ordered`);
      await refresh();
      setOrderedStock(0);
    } catch (error) {
      alert(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
    }
  }

  async function handleArrived() {
    try {
      const responseArrived = await onArrived({
        stock: product.stock + product.incomingStock,
      });

      if (arrivedError) {
        alert(JSON.stringify(arrivedError));
        throw new Error(JSON.stringify(arrivedError));
      }

      const responseOrder = await onOrder({ stock: null });

      if (orderError) {
        alert(JSON.stringify(orderError));
        throw new Error(JSON.stringify(orderError));
      }

      alert(
        `${product.series ? product.series : product.name}'s stock updated`
      );
      await refresh();
      setCheckArrived(false);
    } catch (error) {
      alert(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
    }
  }

  return (
    <div className="flex flex-col items-center admin-order-products">
      <div className="flex justify-between items-center admin-ordering-stock">
        <p className={`${product.stock <= 10 ? "alert-stock" : ""}`}>
          {product.stock}
        </p>
        <div className="flex justify-between items-center ordering-container">
          <button
            onClick={() =>
              setOrderedStock((order) => {
                if (order > 0) {
                  return order - 1;
                } else {
                  return 0;
                }
              })
            }
          >
            <FiMinusCircle />
          </button>
          <p className="ordering-quantity">{orderedStock}</p>
          <button onClick={() => setOrderedStock(orderedStock + 1)}>
            <FiPlusCircle />
          </button>
        </div>
        <p className="product-discount">{product.incomingStock}</p>
      </div>
      <div className="flex justify-between ordering-buttons">
        <div
          className={orderedStock === 0 ? "no-order" : ""}
          onClick={handleOrder}
        >
          <Button text={"Order"} />
        </div>
        <div onClick={() => setCheckArrived(!checkArrived)}>
          <Button text={"Arrived"} />
        </div>
      </div>
      {checkArrived && (
        <div
          className="flex items-center justify-center fixed check-arrived"
          onClick={() => setCheckArrived(false)}
        >
          <div
            className="flex flex-col justify-center items-center admin-products-list-container"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>Are you sure that you recieved the product?</h2>
            <div className="flex justify-between ordering-buttons check-buttons">
              <div onClick={handleArrived}>
                <Button text="Yes" />
              </div>
              <div onClick={() => setCheckArrived(false)}>
                <Button text="No" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
