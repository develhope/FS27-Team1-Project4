/* Component Author Andrea */

/* Custom Hook Author Andrea */

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ChatContext = createContext("");
const SpeakingContext = createContext("");

export function useChat() {
  return useContext(ChatContext)
}

export function useSpeaking() {
  return useContext(SpeakingContext)
}

export function ChatProvider({ children }) {
  const [telling, setTelling] = useState("");
  const [speak, setSpeak] = useState("");
  const intervalRef = useRef(null);
  const iRef = useRef(0);

  useEffect(() => {
    iRef.current = 0;
    setTelling("");

    function speaking(sentence) {
      setTelling((prevTelling) => {
        const newTelling = prevTelling + sentence[iRef.current];
        iRef.current++;

        if (iRef.current === sentence.length) {
          clearInterval(intervalRef.current);
        }
        return newTelling;
      });
    }

    intervalRef.current = setInterval(() => {
      speaking(speak);
    }, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [speak]);

  return (
    <ChatContext.Provider value={telling}>
      <SpeakingContext.Provider value={setSpeak}>
        {children}
      </SpeakingContext.Provider>
    </ChatContext.Provider>
  );
}
