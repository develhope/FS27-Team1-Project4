/* Custom Hook author Andrea */

import { useEffect, useState } from "react";

export function useRandom(numberSign, numberString, arrayLength) {
  const [randomString, setRandomString] = useState("");
  const [randomSign, setRandomSign] = useState("");
  const [randomMonoStringsArray, setRandomMonoStringsArray] = useState([])

  const keyboardSigns = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    "|",
    ";",
    ":",
    "'",
    ",",
    ".",
    "/",
    "<",
    ">",
    "?",
    "~",
    "`",
  ];

  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const alphabetUpperCase = [
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

  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  function randomArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i >= 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
    }
    return newArray;
  }

  function randomizer(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateRandomString(number, setter, type) {
    let string = "";
    for (let i = 0; i < number; i++) {
      string += randomizer(type);
    }
    setter(string);
  }

  function generateRandomMonoStringsArray(arrayLength) {
    const newArray = [];
    for (let i = 0; i < arrayLength; i++) {
      newArray[i] = randomizer([...keyboardSigns, ...alphabet,...alphabetUpperCase,...numbers])
    }
    setRandomMonoStringsArray(newArray)
  }

  useEffect(() => {
    generateRandomString(numberSign, setRandomSign, keyboardSigns);
    generateRandomString(numberString, setRandomString, alphabet);
    generateRandomMonoStringsArray(arrayLength)
  }, [numberSign, numberString, arrayLength]);

  return {
    randomArray,
    randomString,
    randomSign,
    randomMonoStringsArray,
  };
}
