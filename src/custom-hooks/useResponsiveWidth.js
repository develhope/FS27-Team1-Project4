/* Custom Hook Author Andrea */

import { useEffect, useState } from "react";

export function useResponsiveWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return {
    screenWidth,
  };
}
