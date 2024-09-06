import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { CreditCardList } from "./CreditCardList";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingMessage } from "./LoadingMessage";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";
import { CreaditCardAdd } from "./CreditCardAdd";
import { useRender } from "./ChatProvider";

export function CreditCardManagment() {
  const { user, refreshUser } = useLocalUser();
  const { render } = useRender();
  const [chosenCC, setChosenCC] = useState(user.defaultCard);

  const { data, error, loading, onRefresh } = useGetFetch(
    `users/cc/lfd/${user.id}`
  );

  const [onDefault, defaultData, defaultError] = useFetch(
    `users/cc/default/${user.id}`,
    "PUT"
  );

  const [onGetUser, userData, userError] = useFetch(
    `user/id/${user.id}`,
    "GET"
  );

  useEffect(() => console.log(chosenCC), [chosenCC]);

  useEffect(() => {
    refreshUser();
    onRefresh();
  }, [render]);

  function handleChosenCard(index) {
    setChosenCC(index);
  }

  async function handleChangeDefault() {
    try {
      const response = await onDefault({ card: chosenCC });

      if (defaultError) {
        throw new Error(response.msg);
      }

      const updatedUser = await onGetUser();

      if (userError) {
        throw new Error(updatedUser.msg);
      }

      localStorage.setItem("user_nt1", JSON.stringify(updatedUser));
      refreshUser();
      alert(response.msg);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-col items-center relative cc-management">
      {loading && <LoadingMessage />}
      {error && <ErrorMessage />}
      {data && (
        <>
          <h1>{user.username}'s Cards</h1>
          <div className="flex flex-col items-center cc-container">
            <div className="flex flex-col w-full card-list">
              {data.length <= 0 && (
                <div className="cc">
                  <h2>No Credit Card available</h2>
                </div>
              )}
              {data.length > 0 && (
                <>
                  <div className="flex justify-between cc-header">
                    <div></div>
                    <p>Choose the default card for your puchases:</p>
                  </div>
                  <div className="flex flex-col cc-list">
                    <CreditCardList
                      cc={data}
                      chosenCC={chosenCC}
                      onChange={handleChosenCard}
                    />
                  </div>
                  <div className="flex justify-between items-center default-card-button">
                    <div></div>
                    <div onClick={handleChangeDefault}>
                      <Button text="Set the default Card" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <CreaditCardAdd />
          </div>
        </>
      )}
    </div>
  );
}
