import { useEffect, useState } from "react";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useRender } from "./ChatProvider";

const defaultCardNumber = ["", "", "", ""];
const defaultExpireDate = ["", ""];

export function CreaditCardAdd() {
  const { user, refreshUser } = useLocalUser();
  const [cardNumber, setCardNumber] = useState(defaultCardNumber);
  const [expireDate, setExpireDate] = useState(defaultExpireDate);
  const [newCard, setNewCard] = useState({
    userId: user.id,
    holder: "",
    number: "",
    expire: "",
    cvv: "",
  });
  const { onRender } = useRender()

  const [onAddCard, cardData, cardError] = useFetch("users/cc/add", "POST");
  const { data, error, loading, onRefresh } = useGetFetch(`user/id/${user.id}`);

  useEffect(
    () => setNewCard({ ...newCard, number: cardNumber.join("") }),
    [cardNumber]
  );

  useEffect(
    () => setNewCard({ ...newCard, expire: expireDate.join("/") }),
    [expireDate]
  );

  useEffect(() => console.log(newCard), [newCard]);

  useEffect(() => console.log(data), [data]);

  function onCardNumberChange(value, index, setter, state, digits, input) {
    if (/^\d*$/.test(value)) {
      if (input === "expire-" && index === 0) {
        if (value.length === 1) {
          if (value !== "0" && value !== "1") {
            return;
          }
        }

        if (value.length === 2) {
          if (value < "01" || value > "12") {
            return;
          }
        }
      }

      if (input === "expire-" && index === 1) {
        if (value.length === 1) {
          if (value === "0" || value === "1") {
            return;
          }
        }

        if (value.length === 2) {
          if (value < "24") {
            return;
          }
        }
      }

      const tempState = [...state];
      tempState[index] = value;
      setter(tempState);

      if (value.length === digits && index < state.length - 1) {
        const nextInput = document.getElementById(input + (index + 1));
        nextInput.focus();
      }
    }
  }

  function handleKeyPress(event) {
    const charCode = event.charCode ? event.charCode : event.keyCode;

    if (
      charCode === 8 || // Backspace
      charCode === 46 || // Delete
      charCode === 37 || // Left arrow
      charCode === 39 || // Right arrow
      charCode === 9 // Tab
    ) {
      return;
    }

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  function handleSingleInput(event) {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  }

  async function handleAddCard() {
    try {
      const response = await onAddCard(newCard);

      if (cardError) {
        throw new Error(response.msg);
      }

      const updatedUser = await onRefresh();

      alert(response.msg);

      localStorage.setItem("user_nt1", JSON.stringify(updatedUser));
      refreshUser();
      onRender()
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-col credit-card-add">
      <div className="credit-card-add-fields">
        <label htmlFor="card-number">Card Number:</label>
        <div className="flex card-number-container">
          {cardNumber.map((fourDigit, index) => (
            <div className="flex" key={index}>
              <input
                type="text"
                value={fourDigit}
                onChange={(event) =>
                  onCardNumberChange(
                    event.target.value,
                    index,
                    setCardNumber,
                    cardNumber,
                    4,
                    "card-number-"
                  )
                }
                onKeyDown={handleKeyPress}
                id={`card-number-${index}`}
                name={`card-number-${index}`}
                maxLength="4"
                pattern="\d*"
                inputMode="numeric"
              />
              {index < cardNumber.length - 1 && <p> - </p>}
            </div>
          ))}
        </div>
      </div>
      <div className="credit-card-add-fields">
        <label htmlFor="holder">Card Holder:</label>
        <input
          type="text"
          id="holder"
          name="holder"
          onChange={handleSingleInput}
          value={newCard.holder}
        />
      </div>
      <div className="credit-card-add-fields">
        <label htmlFor="expire">Expiration Date:</label>
        <div className="flex card-number-container expire">
          {expireDate.map((date, index) => (
            <div className="flex" key={index}>
              <input
                type="text"
                value={date}
                name={`expire-${index}`}
                id={`expire-${index}`}
                onChange={(event) => {
                  onCardNumberChange(
                    event.target.value,
                    index,
                    setExpireDate,
                    expireDate,
                    2,
                    "expire-"
                  );
                }}
                onKeyDown={handleKeyPress}
                maxLength="2"
                pattern="\d*"
                inputMode="numeric"
              />
              {index < expireDate.length - 1 && <p> / </p>}
            </div>
          ))}
        </div>
      </div>
      <div className="credit-card-add-fields cvv">
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          name="cvv"
          id="cvv"
          value={newCard.cvv}
          onChange={handleSingleInput}
          maxLength="3"
        />
      </div>
      <div className="flex justify-between items-center default-card-button">
        <div></div>
        <div onClick={handleAddCard}>
          <Button text="Add Credit Card" />
        </div>
      </div>
    </div>
  );
}
