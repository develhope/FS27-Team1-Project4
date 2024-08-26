/* Component Author Andrea */

import { useEffect } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";
import { SingleShipping } from "./SingleShipping";

export function ShippingUserList() {
  const { user } = useLocalUser();
  const { data, error, loading } = useGetFetch(`shippings/user/${user.id}`);

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col items-center relative shipping">
      <div className="flex flex-col items-center admin-products-list">
        <h1>{`${user.username}'s Orders`}</h1>
        {loading && <LoadingMessage />}
        {error && <ErrorMessage error={error} />}
        {data && (
          <div className="flex flex-col admin-products-list-container">
            <div className="flex flex-col products-container">
              {data.map((shipping) => (
                <SingleShipping shipping={shipping} key={shipping.id} />
              ))}
              {data.length === 0 && (
                <div className="flex justify-center">
                  <h1>There are no Shippings at the moment</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
