/* Component Autor Andrea */

import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { CartSingleItem } from "./CartSingleItem";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";
import { useNavigate } from "react-router-dom";

export function CartUser() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user_nt1"))
  );
  const [cart, setCart] = useState(null);
  const [checkboxes, setCheckboxes] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate()

  const { data, error, loading, onRefresh } = useGetFetch(
    `cart/user/${user.id}`
  );
  const [onOrdering, orderingData, orderingError] = useFetch(
    "shipping/create",
    "POST"
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (data) {
      setCart(
        [...data.gearList, ...data.pcList].filter(
          (item) => item.status === null && item.deletedAt === null
        )
      );
    }
  }, [data]);

  useEffect(() => {
    if (cart) {
      const checkboxArray = [];
      cart.forEach((item) => checkboxArray.push(false));
      setCheckboxes(checkboxArray);
    }
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    console.log(checkboxes);
  }, [checkboxes]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  function handleCheckbox(index, productId) {
    const tempCheckboxes = [...checkboxes];
    tempCheckboxes[index] = !tempCheckboxes[index];
    setCheckboxes(tempCheckboxes);

    if (tempCheckboxes[index] === true) {
      const tempOrder = [...order];
      tempOrder.push(productId);
      setOrder(tempOrder);

      if (cart[index].discount) {
        setTotal(total + cart[index].discount);
      } else {
        setTotal(total + cart[index].originalPrice);
      }
    } else {
      const tempOrder = [...order];
      tempOrder.splice(tempOrder.indexOf(productId), 1);
      setOrder(tempOrder);

      if (cart[index].discount) {
        setTotal(total - cart[index].discount);
      } else {
        setTotal(total - cart[index].originalPrice);
      }
    }
  }

  function handleGroupSelect(boolean) {
    setCheckboxes([...checkboxes].map((check) => boolean));

    if (boolean === false) {
      setTotal(0);
    } else {
      const tempTotal = cart.reduce((a, item) => {
        if (item.discount) {
          return a + item.discount;
        } else {
          return a + item.originalPrice;
        }
      }, 0);

      setTotal(tempTotal);
    }
  }

  async function handleOrder() {
    if (total === 0) {
      return;
    }

    try {
      const response = await onOrdering({ userId: user.id, order });

      if (orderingError) {
        alert(orderingError);
        throw new Error(orderingError);
      }

      alert(response.msg);
      navigate(`/shipping/${response.id}`)

    } catch (error) {
      alert(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
    }
  }

  return (
    <div className="flex flex-col items-center justify-center cart-user">
      <div className="flex flex-col items-center relative admin-products-list cart-user">
        <h1>{user.username}'s Cart</h1>
        <div className="flex flex-col admin-products-list-container">
          <div className="flex flex-col products-container">
            {loading && <h1>Loading...</h1>}
            {error && (
              <h1> Something went wrong, couldn't retrieve the products </h1>
            )}
            {cart &&
              cart.map((item, index) => (
                <CartSingleItem
                  product={item}
                  key={index}
                  checkbox={checkboxes}
                  index={index}
                  checkboxHandler={handleCheckbox}
                  onRefresh={onRefresh}
                />
              ))}
          </div>
          <div className="flex items-center justify-between w-full select-buttons">
            <div
              className="unselect-all"
              onClick={() => handleGroupSelect(false)}
            >
              <Button text={"Unselect all"} />
            </div>
            <div className="select-all" onClick={() => handleGroupSelect(true)}>
              <Button text="Select all" />
            </div>
          </div>
          <div className="flex items-center justify-end w-full total-and-buy">
            <h2>Total: {total.toFixed(2) + " $"}</h2>
            <div
              className={`buy-button ${total === 0 ? "disabled" : ""}`}
              onClick={handleOrder}
            >
              <Button text="Buy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
