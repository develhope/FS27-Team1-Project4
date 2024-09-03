import { useRef, useState } from "react";
import { useEffect } from "react";
import { SpotTheWordRandomLine } from "./SpotTheWordRandomLine";
import { useRandom } from "../custom-hooks/useRandom";
import { useGameCompleted } from "../custom-hooks/useGameCompleted";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { DeepStolenNode } from "./DeepStolenNode";
import { useSpeaking } from "./ChatProvider";

export function SpotTheWord() {
  const { user } = useLocalUser();
  const [randomizedArray, setRandomizedArray] = useState([]);
  const [winningWord, setWinningWord] = useState("");
  const [results, setResults] = useState([]);
  const { randomArray, randomSign, randomString } = useRandom(3, 5);
  const [success, setSuccess] = useState(false);
  const [stolen, setStolen] = useState(false);

  const gameRef = useRef(user.games.find((game) => game.name === "valentine"));
  const onCompleted = useGameCompleted(gameRef.current.id);

  const setChat = useSpeaking();

  const gameArray = [
    "teal",
    "seal",
    "meal",
    "real",
    "oral",
    "fear",
    "feel",
    "bear",
    "mail",
    "heat",
    "hear",
    "deal",
    "lean",
    "rail",
    "rate",
    "bail",
    "tail",
    "near",
    "gear",
  ];

  useEffect(() => {
    setRandomizedArray(randomArray(gameArray));
    if (gameRef.current.completed) {
      setStolen(true);
    }

    setTimeout(() => {
      setChat("Find the right word inside this code");
    }, 200);
  }, []);

  useEffect(() => {
    setWinningWord(
      randomizedArray[Math.floor(Math.random() * randomizedArray.length)]
    );
  }, [randomizedArray]);

  function handleComparison(word) {
    let diff = 0;

    for (let i = 0; i < word.length; i++) {
      if (winningWord[i] === word[i]) {
        diff++;
      }
    }

    if (diff === word.length) {
      setChat(
        `Well done! "${word}" is the right word! Now grab the informations`
      );
      setSuccess(true);
    } else {
      setChat(`"${word}" has ${diff} letters in common with the right word`);
      setResults([...results, { word, diff }]);
    }
  }

  return (
    <div className="flex flex-wrap justify-center spot-the-word">
      <div className="flex flex-col justify-between items-center spot-container">
        <div className="flex items-start justify-center grid-words-container">
          <div className="grid words-container">
            {randomizedArray.map((word, index) => (
              <div key={index} className="flex">
                <SpotTheWordRandomLine
                  key={index}
                  word={word}
                  handleComparison={() => handleComparison(word)}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex flex-col items-center ${
            success ? "justify-center" : "justify-end"
          } show-results`}
        >
          {!success &&
            results.map((result, index) => (
              <div key={result.word + index}>
                {" "}
                <p className="">{result.word}</p>{" "}
                <p className="">{result.diff} letters in common</p>
              </div>
            ))}
          {success && (
            <div
              className="flex justify-center items-center spot-data"
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
      </div>
    </div>
  );
}
