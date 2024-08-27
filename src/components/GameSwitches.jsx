import { useEffect, useRef, useState } from "react";
import { DeepStolenNode } from "./DeepStolenNode";
import { useGameCompleted } from "../custom-hooks/useGameCompleted";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { useSpeaking } from "./ChatProvider";

export function GameSwitches() {
  const { user, refreshUser } = useLocalUser();

  const [switcher, setSwitcher] = useState([
    true,
    false,
    false,
    false,
    true,
    true,
    false,
  ]);

  const [success, setSuccess] = useState(false);
  const [stolen, setStolen] = useState(false);

  const setChat = useSpeaking();

  const gameRef = useRef(user.games.find((game) => game.name === "provenzano"));
  const onCompleted = useGameCompleted(gameRef.current.id);

  useEffect(() => {
    setTimeout(() => {
      setChat("Turn all switches green");
    }, 200);
  }, []);

  useEffect(() => {
    if (gameRef.current.completed) {
      setStolen(true);
    }
    console.log(gameRef.current);
  }, []);

  function handleSwitcher(index) {
    const newSwitcher = [...switcher];
    newSwitcher[index] = !newSwitcher[index];

    if (index > 0) {
      newSwitcher[index - 1] = !newSwitcher[index - 1];
    }
    if (index < switcher.length - 1) {
      newSwitcher[index + 1] = !newSwitcher[index + 1];
    }
    setSwitcher(newSwitcher);
  }

  useEffect(() => {
    if (switcher.every((interruttore) => interruttore)) {
      setSuccess(true);
      setChat("Well done, now take the informations and pass to another node");
    } else {
      setSuccess(false);
    }
    console.log(switcher);
  }, [switcher]);

  useEffect(() => {
    console.log(success);
  }, [success]);

  return (
    <div>
      <h1>Accendi tutti gli interruttori!</h1>
      <div className="pulsantiera">
        {switcher.map((interruttore, index) => (
          <button
            key={index}
            onClick={() => handleSwitcher(index)}
            className={`pulsante ${interruttore ? "on" : ""}`}
          ></button>
        ))}
      </div>
      {success && (
        <div
          className="flex justify-center items-center data"
          onClick={onCompleted}
        >
          <DeepStolenNode stolen={stolen} id={gameRef.current.employeeId} />
        </div>
      )}
    </div>
  );
}
