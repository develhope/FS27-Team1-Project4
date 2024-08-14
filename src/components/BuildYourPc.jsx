/*Component author Andrea */

import { Link } from "react-router-dom";
import biggerWidthImg from "../assets/build-your-pc-big.png";
import smallerWidthImg from "../assets/build-your-pc-small.png";
import { useEffect, useState } from "react";

export function BuildYourPc() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <Link
      to={"/contact"}
      className="flex flex-col items-center justify-center relative build-your-pc"
    >
      <div className="image-container">
        <img
          src={screenWidth <= 768 ? smallerWidthImg : biggerWidthImg}
          alt="Build Your PC"
        />
        <div className="flex flex-col justify-between items-start absolute text-container">
          <div className="flex items-center h1-container">
            <h1>ARE YOU A GAMER OR A DIGITAL ARTIST?</h1>
          </div>
          <div className="flex flex-col place-self-end building">
            <h2>Build your PC </h2>
            <h2>with the help of our assistants!</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}
