import React, { useEffect, useState, useCallback, useRef } from "react";
import { useGameCompleted } from "../custom-hooks/useGameCompleted";
import { useSpeaking } from "./ChatProvider";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { DeepStolenNode } from "./DeepStolenNode";

const generateRandomNumber = () => Math.floor(Math.random() * 99);

export function FindNumberGame() {
  const { user, refreshUser } = useLocalUser();

  const [grid, setGrid] = useState([]);
  const [fixedNumbers, setFixedNumbers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [success, setSuccess] = useState(false);
  const [stolen, setStolen] = useState(false);
  const [initialNum, setInitialNum] = useState(4);
  const [life, setLife] = useState(4);
  const [score, setScore] = useState(0);

  const setChat = useSpeaking();
  const gameRef = useRef(user.games.find((game) => game.name === "vitale"));
  const onCompleted = useGameCompleted(gameRef.current.id);

  useEffect(() => {
    setTimeout(() => {
      setChat("Find all the required numbers in the table");
    }, 200);
  }, []);

  useEffect(() => {
    if (gameRef.current.completed) {
      setStolen(true);
    }
    console.log(gameRef.current);
  }, []);

  const initializeGrid = useCallback(() => {
    const fixed = [];
    while (fixed.length < 4) {
      const num = generateRandomNumber();
      if (!fixed.includes(num)) {
        fixed.push(num);
      }
    }
    setFixedNumbers(fixed);

    const initialGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => generateRandomNumber())
    );

    const fixedPositions = [];
    fixed.forEach((num) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        if (!fixedPositions.some((pos) => pos.row === row && pos.col === col)) {
          initialGrid[row][col] = `fixed-${num}`;
          fixedPositions.push({ row, col });
          placed = true;
        }
      }
    });

    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    if (timer > 0 && !success) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (score === 400) {
      setSuccess(true);
      setChat("Well done, now take the informations and pass to another node");
    }
  }, [timer, success]);

  useEffect(() => {
    if (!success) {
      const interval = setInterval(() => {
        setGrid((prevGrid) =>
          prevGrid.map((row) =>
            row.map((cell) =>
              typeof cell === "string" ? cell : generateRandomNumber()
            )
          )
        );
      }, 500);

      return () => clearInterval(interval);
    }
  }, [success]);

  const handleClick = (num) => {
    const actualNum =
      typeof num === "string" ? parseInt(num.split("-")[1]) : num;
    if (fixedNumbers.includes(actualNum)) {
      setFixedNumbers((prev) => prev.filter((n) => n !== actualNum));
      setInitialNum((prev) => prev - 1);
      setScore((prev) => prev + 100);
    } else {
      setLife((prev) => prev - 1);
      setScore((prev) => Math.max(0, prev - 50));
    }
  };

  useEffect(() => {
    if (initialNum === 0) {
      setSuccess(true);
      setChat("Well done, now take the informations and pass to another node");
      setTimeout(() => alert("You win!"), 100);
    }
    if (life === 0 || (timer === 0 && score < 400)) {
      setTimeout(() => alert("Game over!"), 100);
      resetGame()
    }
  }, [initialNum, life, timer]);

  const resetGame = () => {
    setTimer(30);
    setSuccess(false);
    setInitialNum(4);
    setLife(4);
    setScore(0);
    initializeGrid();
  };

  return (
    <div className="find-number-game">
      <div className="game-container flex">
        <div className="game-content">
          <div className="game-info">
            <div className="fixed-numbers">
              {fixedNumbers.map((num, index) => (
                <span key={index} className="fixed-number">
                  {num}
                </span>
              ))}
            </div>
            <div className="stats">
              <div className="timer">Time: {timer}</div>
              <div className="life">Lives: {life}</div>
              <div className="score">Score: {score}</div>
            </div>
          </div>
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${
                      typeof cell === "string" ? "fixed" : ""
                    }`}
                    onClick={() => !success && handleClick(cell)}
                  >
                    {typeof cell === "string" ? cell.split("-")[1] : cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {success && (
          <div className="deep-stolen-node-container ml-4">
            <div
              className="flex justify-center items-center data"
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
    </div>
  );
}
