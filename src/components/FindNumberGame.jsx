import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

import React, { useEffect, useState, useCallback } from "react";


const generateRandomNumber = () => Math.floor(Math.random() * 99);

export function FindNumberGame() {
  const [grid, setGrid] = useState([]);
  const [fixedNumbers, setFixedNumbers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [initialNum, setInitialNum] = useState(4);
  const [life, setLife] = useState(4);
  const [score, setScore] = useState(0);

  const initializeGrid = useCallback(() => {
    const fixed = Array.from({ length: 4 }, generateRandomNumber);
    setFixedNumbers(fixed);

    const initialGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => generateRandomNumber())
    );

    fixed.forEach((num) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        if (typeof initialGrid[row][col] !== "string") {
          initialGrid[row][col] = `fixed-${num}`;
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
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  useEffect(() => {
    if (!gameOver) {
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
  }, [gameOver]);

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
      setGameOver(true);
      setTimeout(() => alert("Hai vinto!"), 100);
    }
    if (life === 0) {
      setGameOver(true);
      setTimeout(() => alert("Hai perso!"), 100);
    }
  }, [initialNum, life]);

  const resetGame = () => {
    setTimer(30);
    setGameOver(false);
    setInitialNum(4);
    setLife(4);
    setScore(0);
    initializeGrid();
  };

  return (
    <div className="app">
      <h1>Hacker Game</h1>
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
                className={`cell ${typeof cell === "string" ? "fixed" : ""}`}
                onClick={() => !gameOver && handleClick(cell)}
              >
                {typeof cell === "string" ? parseInt(cell.split("-")[1]) : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
