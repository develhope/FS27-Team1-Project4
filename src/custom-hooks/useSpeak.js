import { useEffect, useRef, useState } from "react";

export function useSpeak(string) {
  const [telling, setTelling] = useState("");
  const intervalRef = useRef(null);
  const iRef = useRef(0);

  useEffect(() => {
    iRef.current = 0
    setTelling("")

    function speaking(sentence) {
      setTelling((prevTelling) => {
        const newTelling = prevTelling + string[iRef.current];
        iRef.current++;

        if (iRef.current === sentence.length) {
          clearInterval(intervalRef.current);
        }
        return newTelling;
      });
    }

    intervalRef.current = setInterval(() => {
      speaking(string);
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [string]);

  return {
    chat: telling,
  };
}
