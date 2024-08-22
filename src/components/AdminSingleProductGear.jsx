/* Component Author Andrea */

import { useParams } from "react-router-dom";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useEffect } from "react";
import { AdminSingleProductCommon } from "./AdminSingleProductCommon";

export function AdminSingleProductGear() {
  const { id } = useParams();
  const { data, error, loading, onRefresh } = useGetFetch(
    `products/gears/id/${id}`
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <>
      {" "}
      {loading && <h1 className="loading-message-product">Loading...</h1>}
      {error && <h1 className="error-message-product">{error}</h1>}
      {data && (
        <AdminSingleProductCommon
          product={data}
          refresh={onRefresh}
          type={"gears"}
        >
          <div className="admin-product-line">
            <p>Gear: {data.gear}</p>
          </div>
          <div className="admin-product-line">
            <p>Brand: {data.brand}</p>
          </div>
          <div className="admin-product-line">
            <p>Features:</p>
            <div className="flex flex-col show-features">
              {data.features.map((feature, index) => (
                <p key={index} >{feature}</p>
              ))}
            </div>
          </div>
          {data.linkInfo && <div className="admin-product-line">
            Link more informations: <a href={data.linkInfo}>{data.linkInfo}</a></div>}
        </AdminSingleProductCommon>
      )}
    </>
  );
}
