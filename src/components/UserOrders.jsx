import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";

export function UserOrders() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user_nt1"))
  );
  const { data, error, loading, onRefresh } = useGetFetch(
    `cart/user/${user.id}`
  );
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setItems([...data.gearList, ...data.pcList]);
    }
  }, [data]);

  useEffect(() => {
    if (items) {
      console.log(items);
      const filtered = items.filter(
        (item) => item.status !== null && item.deleteAt == null
      );
      setFilteredItems(filtered);
      console.log(filtered);
    }
  }, [items]);

  useEffect(() => {
    if (filteredItems) {
      console.log(filteredItems);
    }
  }, [filteredItems]);

  useEffect(() => {
    if (items) {
      console.log("Items:", items);
    }
  }, [items]);

  return (
    <div className="flex flex-col items-center justify-center cart-user">
      <div className="flex flex-col items-center relative admin-products-list cart-user">
        <h1>{user.username}'s Order</h1>
        <div className="flex flex-col admin-products-list-container">
          <div className="flex flex-col products-container">
            {loading && <LoadingMessage />}
            {error && <ErrorMessage error={error} />}
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="flex items-center admin-product">
                  <div className="flex justify-center items-center product-image-container">
                    {item.image && (
                      <img
                        src={`http://localhost:3000${item.image}`}
                        alt={item.name}
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between admin-product-info">
                    <div className="flex items-center justify-center name">
                      <h3>{item.series ? item.series : item.name}</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/2">
                      <div className="brand-product">
                        <p>Status:</p>
                        <p className="product-discount">{item.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center cart-managment">
                    <p>Estimated delivery: </p>
                    <p className="product-discount">{item.deliveryDate} days</p>
                  </div>
                </div>
              ))
            ) : (
              <h2>You have no order</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
