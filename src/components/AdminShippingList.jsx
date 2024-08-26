/* Component Author Andrea */

import { useGetFetch } from "../custom-hooks/useGetFetch";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingMessage } from "./LoadingMessage";
import { SingleShipping } from "./SingleShipping";

export function AdminShippingList() {
  const { data, error, loading, onRefresh } = useGetFetch("shippings");
  return (
      <div className="flex flex-col items-center shipping">
        <div className="flex flex-col items-center admin-products-list">
          <h1>{`Users Orders`}</h1>
          {loading && <LoadingMessage />}
          {error && <ErrorMessage error={error} />}
          {data && (
            <div className="flex flex-col admin-products-list-container">
              <div className="flex flex-col products-container">
                {data.map((shipping) => (
                  <SingleShipping shipping={shipping} admin={true} onRefresh={onRefresh} key={shipping.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
