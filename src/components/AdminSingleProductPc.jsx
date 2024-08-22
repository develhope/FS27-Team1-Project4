/* Component Author Andrea */

import { useParams } from "react-router-dom";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useEffect } from "react";
import { AdminSingleProductCommon } from "./AdminSingleProductCommon";

export function AdminSingleProductPc() {
  const { id } = useParams();
  const { data, error, loading, onRefresh } = useGetFetch(
    `products/pc/id/${id}`
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
          type={"pc"}
        >
          <div className="admin-product-line">
            <div className="flex gap-2">
              <p>Description:</p>
              <p>{data.description}</p>
            </div>
          </div>
        </AdminSingleProductCommon>
      )}
    </>
  );
}
