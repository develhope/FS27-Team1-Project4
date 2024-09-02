import { useEffect, useRef, useState } from "react";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { DeepStolenNode } from "./DeepStolenNode";
import { useGameCompleted } from "../custom-hooks/useGameCompleted";
import { useSpeaking } from "./ChatProvider";

export function ChangingGame() {
  const [gameInput, setGameInput] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, refreshUser } = useLocalUser();
  const [stolen, setStolen] = useState(false);
  const setChat = useSpeaking();

  const inputRef = useRef(null);
  const gameRef = useRef(user.games.find((game) => game.name === "begin"));
  const onCompleted = useGameCompleted(gameRef.current.id);

  useEffect(() => {
    gameInput === "ENTER" ? setSuccess(true) : setSuccess(false);
  }, [gameInput]);

  useEffect(() => {
    if (gameRef.current.completed) {
      setStolen(true);
    }

    setTimeout(() => {
      inputRef?.current.focus();
      setChat('Digit "ENTER" to gain access to the Node');
    }, 200);

    console.log(gameRef.current);
  }, []);

  useEffect(() => {
    if (success) {
      setChat("Well done, now click on the node to get the informations");
    }
  }, [success]);

  function handleKeySwap(event) {
    const uppercaseAlphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const reversedAlphabet = [...uppercaseAlphabet].reverse();
    console.log(event.key);
    if (uppercaseAlphabet.includes(event.key.toUpperCase())) {
      const index = uppercaseAlphabet.indexOf(event.key.toUpperCase());
      const newLetter = reversedAlphabet[index];
      setGameInput(gameInput + newLetter);
    } else if (event.key === "Backspace") {
      setGameInput(gameInput.substring(0, gameInput.length - 1));
    }
  }

  return (
    <div className="flex flex-col items-center justify-start changing-game-container">
      <div className="flex justify-center game">
        <input
          type="text"
          value={gameInput}
          onKeyDown={handleKeySwap}
          ref={inputRef}
        />
      </div>
      {success && (
        <div
          className="flex justify-center items-center changing-data"
          onClick={onCompleted}
        >
          <DeepStolenNode
            setStolen={setStolen}
            stolen={stolen}
            id={gameRef.current.employeeId}
          />
        </div>
      )}
    </div>
  );
}
