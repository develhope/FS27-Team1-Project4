/* Component Author Andrea */

import { useNavigate } from "react-router-dom";
import { DeepDots } from "./DeepDots";
import { useResponsiveWidth } from "../custom-hooks/useResponsiveWidth"
import { useEffect } from "react";

export function NodeDeep({ employee, path, gameCleared }) {
  const navigate = useNavigate()
  const { screenWidth } = useResponsiveWidth()

  useEffect(() => {
    console.log(employee)
  }, [screenWidth])

  return (
    <div className={`flex relative node-deep ${gameCleared ? "node-gained" : ""}`} onClick={() => navigate(path)}>
      <div className="relative inner-node"></div>
      <div className="absolute border-node"></div>
      <div className="absolute vertical-cover"></div>
      <div className="absolute angular-cover"></div>
      <div className="absolute sash"></div>
      <div className="flex justify-center item-center absolute dots-container">
        <div className={`flex justify-center items-center`}>
          <DeepDots dotsOpacity={0.2} />
          <DeepDots dotsOpacity={0.5} />
        </div>
        <DeepDots dotsNumber={6} dotsColumns={2} dotsWeight="hard" />
      </div>
      <div className={`flex ${screenWidth <= 1280 ? "flex-col" : ""} items-center absolute employee`}>
       {screenWidth > 1280 && <p>{employee}</p>}
       {screenWidth <= 1280 && employee.split("").map((letter, index) => <span key={index}>{letter}</span>)}
      </div>
    </div>
  );
}
