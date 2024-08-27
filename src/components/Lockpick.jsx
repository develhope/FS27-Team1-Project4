import { useEffect, useRef, useState } from "react";
import { LockpickCircle } from "./LockpickCircle";
import { useSpeak } from "../custom-hooks/useSpeak";
import { useRender, useSpeaking } from "./ChatProvider";
import { DeepStolenNode } from "./DeepStolenNode";
import { useLocalUser } from "../custom-hooks/useLocalUser"
import { useGameCompleted } from "../custom-hooks/useGameCompleted";

export function Lockpick() {
  const {user, refreshUser} = useLocalUser()
  const [firstAngle, setFirstAngle] = useState(0);
  const [secondAngle, setSecondAngle] = useState(0);
  const [thirdAngle, setThirdAngle] = useState(0);
  const [forthAngle, setForthAngle] = useState(0);
  const [firstUnlocked, setFirstUnlocked] = useState(false);
  const [secondUnlocked, setSecondUnlocked] = useState(false);
  const [thirdUnlocked, setthirdUnlocked] = useState(false);
  const [forthUnlocked, setforthUnlocked] = useState(false);

  const [success, setSuccess] = useState(false);
  const [stolen, setStolen] = useState(false)

  const setChat = useSpeaking();
  const {onRender} = useRender()

  const gameRef = useRef(user.games.find(game => game.name === "schiariti"))

  const winningRef = useRef({
    first: 172,
    second: 112,
    third: 172,
    forth: 156,
  });

  const onCompleted = useGameCompleted(gameRef.current.id)

  useEffect (() => {
    if (gameRef.current.completed) {
      setStolen(true)
    }
    console.log(gameRef.current)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (firstUnlocked && secondUnlocked && thirdUnlocked && forthUnlocked) {
        setSuccess(true);
        setChat("Well done, now take the informations and pass to another node")
      }
    }, 1000);
  }, [firstUnlocked, secondUnlocked, thirdUnlocked, forthUnlocked]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowRight") {
        handleRotation(incrementAngle);
      } else if (event.key === "ArrowLeft") {
        handleRotation(decrementAngle);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    firstAngle,
    secondAngle,
    thirdAngle,
    forthAngle,
    firstUnlocked,
    secondUnlocked,
    thirdUnlocked,
    forthUnlocked,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setChat(
        "Rotate the cilinders and try to find the right angle to pick the locks"
      );
    }, 200);
  }, []);

  function incrementAngle(currentAngle, circleSetter) {
    if (currentAngle === 360) {
      currentAngle = 0;
    }
    const newAngle = currentAngle + 4;
    if (newAngle >= 360) {
      circleSetter(0);
    } else {
      circleSetter(newAngle);
    }
  }

  function decrementAngle(currentAngle, circleSetter) {
    if (currentAngle === 0) {
      currentAngle = 360;
    }
    const newAngle = currentAngle - 4;
    if (newAngle <= 0) {
      circleSetter(360);
    } else {
      circleSetter(newAngle);
    }
  }

  function handleRotation(direction) {
    if (firstUnlocked && secondUnlocked && thirdUnlocked && forthUnlocked) {
      return;
    } else if (firstUnlocked && secondUnlocked && thirdUnlocked) {
      direction(forthAngle, setForthAngle);
    } else if (firstUnlocked && secondUnlocked) {
      direction(thirdAngle, setThirdAngle);
    } else if (firstUnlocked) {
      direction(secondAngle, setSecondAngle);
    } else {
      direction(firstAngle, setFirstAngle);
    }
  }

  return (
    <div className="flex flex-col items-center box-border w-full h-full relative lockpick">
      <div className="flex flex-col items-center w-full h-full justify-between gap-2.5 game-container">
        <div className="h-full w-full items-center justify-center flex">
          <LockpickCircle
            angle={firstAngle}
            toUnlock={winningRef.current.first}
            unlocked={firstUnlocked}
            onUnlocking={setFirstUnlocked}
            success={success}
          >
            <LockpickCircle
              angle={secondAngle}
              toUnlock={winningRef.current.second}
              unlocked={secondUnlocked}
              onUnlocking={setSecondUnlocked}
              success={success}
            >
              <LockpickCircle
                angle={thirdAngle}
                toUnlock={winningRef.current.third}
                unlocked={thirdUnlocked}
                onUnlocking={setthirdUnlocked}
                success={success}
              >
                <LockpickCircle
                  angle={forthAngle}
                  toUnlock={winningRef.current.forth}
                  unlocked={forthUnlocked}
                  onUnlocking={setforthUnlocked}
                  success={success}
                ></LockpickCircle>
              </LockpickCircle>
            </LockpickCircle>
          </LockpickCircle>
        </div>
        <div className="flex justify-between items-center turning-buttons">
          <button onClick={() => handleRotation(decrementAngle)}>{"<"}</button>
          <button onClick={() => handleRotation(incrementAngle)}>{">"}</button>
        </div>
      </div>
      { success && (
        <div className="flex justify-center items-center data" onClick={onCompleted}>
          <DeepStolenNode setStolen={setStolen} stolen={stolen} id={gameRef.current.employeeId}/>
        </div>
      )}
    </div>
  );
}
