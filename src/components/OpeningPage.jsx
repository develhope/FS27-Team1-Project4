/* Component author Andrea */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRandom } from "../custom-hooks/useRandom";

export function OpeningPage() {
  const gridRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("keydown", handleOpening);

    return window.addEventListener("keydown", handleOpening);
  }, []);

  function handleOpening() {
    gridRef.current?.classList.add("opened-page");
    setTimeout(() => navigate("/deep"), 3000);
  }

  const { randomMonoStringsArray } = useRandom(0, 0, 1000);
  return (
    <div
      onClick={handleOpening}
      className="flex justify-center items-center relative opening-page"
    >
      <div className="grid absolute opening-grid" ref={gridRef}>
        {randomMonoStringsArray.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </div>
    </div>
  );
}
