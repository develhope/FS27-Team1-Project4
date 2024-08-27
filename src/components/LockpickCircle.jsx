import { useEffect, useRef, useState } from "react";

export function LockpickCircle({
  angle,
  toUnlock,
  unlocked,
  onUnlocking,
  success,
  children,
}) {
  const [near, setNear] = useState(false);
  const angleRef = useRef(angle);

  useEffect(() => {
    angleRef.current = angle;

    if (angle === toUnlock) {
      setTimeout(() => {
        if (angleRef.current === toUnlock) {
          onUnlocking(true);
        } else {
          onUnlocking(false);
        }
      }, 2000);
    }

    if (angle >= toUnlock - 32 && angle <= toUnlock + 32) {
      setNear(true);
    } else {
      setNear(false);
    }
  }, [angle]);

  const tempAngle = {
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div
      className={`lock flex justify-center items-center " + ${near && !success ? "red" : "green"}`}
    >
      <div className={`pointer ${unlocked && "unlocked"}`}></div>
      <div
        className={`lock flex justify-center items-center " + ${near && !success ? "close" : "far"}`}
        style={tempAngle}
      >
        <div className="w-3/4 h-3/4">{children}</div>
      </div>
    </div>
  );
}
