/* Component Author Andrea */

import { useParams } from "react-router-dom";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { useEffect, useState } from "react";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";
import { ShippingStatusString } from "./ShippingStatusString";
import { CartSingleItem } from "./CartSingleItem";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";
import { ShippingStatusIcon } from "./ShippingStatusIcon";

export function ShippingProductList() {
  const { user } = useLocalUser();
  const { id } = useParams();
  const [productList, setProductList] = useState(null);
  const [total, setTotal] = useState(0);

  const { data, error, loading, onRefresh } = useGetFetch(`shipping/${id}`);
  const [onCancel, cancelData, cancelError] = useFetch(`shipping/update-status/${id}`, "PUT")

  useEffect(() => {
    if (data) {
      if (data.gearList && data.pcList) {
        setProductList([...data.gearList, ...data.pcList]);
      }

      if (data.gearList && !data.pcList) {
        setProductList([...data.gearList]);
      }

      if (!data.gearList && data.pcList) {
        setProductList([...data.pcList]);
      }
    }

    console.log(data);
  }, [data]);

  useEffect(() => {
    if (productList) {
      setTotal(productList.reduce((a, product) => {
        if (product.discount) {
          return a + product.discount
        } else {
          return a + product.originalPrice
        }
      }, 0));
    }
    console.log(productList);
  }, [productList]);

  async function handleCancel() {
    const order = productList.map(product => product.id)
    try {
      await onCancel({status: "Canceled", order})

      if (cancelError) {
        alert(cancelError)
        throw new Error(cancelError)
      }

      alert(`The order ${data.number} was canceled`)

      await onRefresh()
    } catch(error) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <div className="flex flex-col imtes-center relative shipping cart-user">
      {loading && <LoadingMessage />}
      {error && <ErrorMessage error={error} />}
      {data && (
        <div className="flex flex-col justify-center items-center relative admin-products-list">
          <div className="flex flex-col items-center header">
            <h1>Shipping number</h1>
            <h1>{data.number}</h1>
          </div>
          <div className="flex flex-col admin-products-list-container">
            <div className="flex items-center justify-between w-full shipping-product-status-container">
              <div className="flex items-center gap-2">
                <p>
                  Ordered:{" "}
                  <span className="orange">
                    {new Date(data.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="hidden items-center justify-center shipping-icon-container">
                <ShippingStatusIcon status={data.status} />
              </div>
              <div className="flex items-center gap-2">
                <p>Status: </p>
                <ShippingStatusString status={data.status} />
              </div>
            </div>
            <div className="flex flex-col products-container">
              {productList &&
                productList.map((product) => (
                  <CartSingleItem
                    key={product.id}
                    product={product}
                    shipping={true}
                  />
                ))}
            </div>
            <div className="flex items-start total-container">
              <h2>Total: {total.toFixed(2)} $</h2>
            </div>
            {(data.status === "Pending" || data.status === "Working on it") && (
              <div className="flex justify-between items-center w-full cancel-order">
                <div></div>
                <div className="cancel-button disabled-cancel-button" onClick={handleCancel}>
                  <Button text="Cancel Order" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
