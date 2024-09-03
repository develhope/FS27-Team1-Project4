import { useEffect, useRef, useState } from "react";
import knife from "../assets/knife.png";
import bars from "../assets/cell.png";
import bishop from "../assets/bishop.png";
import clock from "../assets/clock.png";
import coffin from "../assets/coffin.png";
import dollar from "../assets/money.png";
import empty from "../assets/riddle-empty.png";
import knight from "../assets/knight.png";
import queen from "../assets/queen.png";
import { ImagesForRiddle } from "./ImagesForRiddle";
import { useNavigate } from "react-router-dom";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useSpeaking } from "./ChatProvider";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { useGameCompleted } from "../custom-hooks/useGameCompleted";
import { DeepStolenNode } from "./DeepStolenNode";

export function RiddleWithImages() {
  const { user } = useLocalUser();
  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);
  const [thirdIndex, setThirdIndex] = useState(0);
  const [tries, setTries] = useState(3);
  const [riddleNumber, setRiddleNumber] = useState(0);
  const setChat = useSpeaking();
  const [success, setSuccess] = useState(false);
  const [stolen, setStolen] = useState(false);

  const navigate = useNavigate();

  const gameRef = useRef(user.games.find((game) => game.name === "shepherd"));

  const onCompleted = useGameCompleted(gameRef.current.id);

  useEffect(() => {
    setTimeout(() => {
      setChat(
        "Solve the 3 riddles by selecting the right image on each one. But beware, if you make 4 mistakes you'll be blocked by the system"
      );
    }, 200);

    if (gameRef.current.completed) {
      setStolen(true);
    }
  }, []);

  const riddles = [
    {
      image: [queen, knight, bishop],
      riddle: [
        "I stand beside the holy man",
        "The monarchs fear my wrath",
        "None may move the way I can",
        "Ever the crooked path",
      ],
      imageIndex: firstIndex,
      indexSetter: setFirstIndex,
    },
    {
      image: [coffin, knife, bars],
      riddle: [
        "The man who devised it",
        "Does not want it",
        "The man who bought it",
        "Does not use it",
        "The man who used it",
        "Does not realize it",
      ],
      imageIndex: secondIndex,
      indexSetter: setSecondIndex,
    },
    {
      image: [dollar, clock, empty],
      riddle: [
        "What man loves more than life",
        "Fears more than death or mortal strife",
        "What poor man have, the rich acquire",
        "and all contented men desire",
        "What misers spend and the wastrels save",
        "and each man carries to the grave?",
      ],
      imageIndex: thirdIndex,
      indexSetter: setThirdIndex,
    },
  ];

  function increment(state, setter) {
    if (state >= riddles.length - 1) {
      setter(0);
    } else {
      setter(state + 1);
    }
  }

  function decrement(state, setter) {
    if (state <= 0) {
      setter(riddles.length - 1);
    } else {
      setter(state - 1);
    }
  }

  return (
    <div className="flex flex-col justify-between items-center relative riddle-game">
      <div className="flex flex-col riddle-game-container">
        <div className="flex justify-end tries">
          {Array.from({ length: tries }, (_, index) => {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              </svg>
            );
          })}
        </div>

        <div className="flex justify-center items-center riddle-header">
          <button onClick={() => decrement(riddleNumber, setRiddleNumber)}>
            <GoChevronLeft />
          </button>
          <h2>RIDDLE {riddleNumber + 1}</h2>
          <button onClick={() => increment(riddleNumber, setRiddleNumber)}>
            <GoChevronRight />
          </button>
        </div>
        <div className="flex flex-col items-center justify-between riddle">
          <div className="flex flex-col items-center gap-3 image-container">
            <ImagesForRiddle
              image={
                riddles[riddleNumber].image[riddles[riddleNumber].imageIndex]
              }
              setterFunctionInc={() =>
                increment(
                  riddles[riddleNumber].imageIndex,
                  riddles[riddleNumber].indexSetter
                )
              }
              setterFunctionDec={() =>
                decrement(
                  riddles[riddleNumber].imageIndex,
                  riddles[riddleNumber].indexSetter
                )
              }
            />
          </div>
          <div className="flex flex-col riddle-text">
            {riddles[riddleNumber].riddle.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <button
        className="flex items-center awnser"
        onClick={() => {
          if (firstIndex === 1 && secondIndex === 0 && thirdIndex === 2) {
            setChat(
              "Great work! You awnsered correctly to all the riddles. Now take the information nodule"
            );
            setSuccess(true);
          } else {
            setTries(tries - 1);
            setChat(
              `Wrong awnser, you have still ${tries} ${
                tries > 1 ? "chances" : "chance"
              }`
            );
            if (tries === 0) {
              alert("BLOCKED");
              navigate("/deep");
            }
          }
        }}
      >
        Answer
      </button>

      {success && (
        <div className="flex justify-center items-center absolute riddle-node-container">
          <div
            className="flex justify-center items-center riddle-data"
            onClick={onCompleted}
          >
            <DeepStolenNode
              setStolen={setStolen}
              stolen={stolen}
              id={gameRef.current.employeeId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
