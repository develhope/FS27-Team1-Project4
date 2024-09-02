import { useRef, useState } from "react";
import { useEffect } from "react";
import { SpotTheWordRandomLine } from "./SpotTheWordRandomLine";
import { useRandom } from "../custom-hooks/useRandom";

export function SpotTheWord() {
  const [randomizedArray, setRandomizedArray] = useState([]);
  const [winningWord, setWinningWord] = useState("");
  const [results, setResults] = useState([]);
  const { randomArray, randomSign, randomString } = useRandom(3, 5);
  const [success, setSuccess] = useState(false)

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
      alert("You did it!");
    } else {
      setResults([...results, { word, diff }]);
    }
  }

  return (
    <div className="flex flex-wrap justify-center spot-the-word">
      <div className="flex flex-col justify-between items-center spot-container">
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
        <div className="flex flex-col items-center justify-end show-results">
          {!success && results.map((result, index) => (
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
