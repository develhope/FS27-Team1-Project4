import { Outlet } from "react-router-dom";
import { NodeDeep } from "./NodeDeep";
import andreaHacker from "../assets/andrea-hacker.png";
import { DeepDots } from "./DeepDots";

export function Deep() {
  const testUser = {
    schiariti: false,
    provenzano: true,
  };

  return (
    <div className="flex deep">
      <div className="flex relative deep-sidebar">
        <div className="first-w-line"></div>
        <div className="second-w-line"></div>
        <div className="third-w-line"></div>
        <div className="absolute h-lines-container">
          <div className="first-h-line"></div>
          <div className="second-h-line"></div>
          <div className="third-h-line"></div>
          <div className="forth-h-line"></div>
        </div>
        <div className="absolute first-border-line"></div>
        <div className="absolute second-border-line"></div>
        <div className="flex flex-col absolute nodes-container">
          <NodeDeep
            employee={"Schiariti A."}
            path={"/"}
            gameCleared={testUser.schiariti}
          />
          <NodeDeep
            employee={"Provenzano D."}
            path={"/"}
            gameCleared={testUser.provenzano}
          />
        </div>
      </div>

      <div className="flex flex-col items-center deep-main">
        <div className="flex items-center justify-center top-main">
          <div className="flex flex-row-reverse dots">
            <DeepDots dotsNumber={8} dotsRows={8} />
            <DeepDots dotsNumber={8} dotsRows={8} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.6} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.6} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.5} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.5} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.4} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.4} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.3} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.3} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.2} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.2} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.1} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.1} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.05} />
            <DeepDots dotsNumber={8} dotsRows={8} dotsOpacity={0.02} />
          </div>
          <div className="flex flex-col promo-card">
            <div className="mock-webmenu"></div>
            <div className="card-carousel"></div>
          </div>
        </div>

        <div className="relative main-game">
          <div className="game">
            <Outlet />
          </div>
          <div className="flex absolute game-bg">
            <div className="first-w-line"></div>
            <div className="second-w-line"></div>
            <div className="third-w-line"></div>
            <div className="forth-w-line"></div>
            <div className="fifth-w-line"></div>
            <div className="sixth-w-line"></div>
          </div>
          <div className="flex flex-col absolute game-bg">
            <div className="first-h-line"></div>
            <div className="second-h-line"></div>
            <div className="third-h-line"></div>
          </div>
          <div className="absolute first-border-line"></div>
          <div className="absolute second-border-line"></div>
          <div className="absolute third-border-line"></div>
          <div className="absolute forth-border-line"></div>
        </div>

        <div className="flex chat">
          <div className="flex justify-center items-center relative hacker-avatar">
            <img src={andreaHacker} alt="hacker" />
            <div className="flex absolute hacker-bg">
              <div className="first-w-line"></div>
              <div className="second-w-line"></div>
              <div className="third-w-line"></div>
              <div className="forth-w-line"></div>
              <div className="fifth-w-line"></div>
              <div className="sixth-w-line"></div>
            </div>
            <div className="flex flex-col absolute hacker-bg">
              <div className="first-h-line"></div>
              <div className="second-h-line"></div>
              <div className="third-h-line"></div>
            </div>
            <div className="absolute dots-container">
              <DeepDots
                dotsNumber={8}
                dotsColumns={3}
                dotsRows={3}
                dotsOpacity={0.4}
              />
            </div>
          </div>
          <div className="relative hacker-chat">
            <div className="relative chat-container">
              <p className="absolute">TEST</p>
              <div className="flex absolute chat-bg">
                <div className="first-w-line"></div>
                <div className="second-w-line"></div>
                <div className="third-w-line"></div>
                <div className="forth-w-line"></div>
                <div className="fifth-w-line"></div>
                <div className="sixth-w-line"></div>
              </div>
              <div className="flex flex-col absolute chat-bg">
                <div className="first-h-line"></div>
                <div className="second-h-line"></div>
                <div className="third-h-line"></div>
                <div className="forth-h-line"></div>
              </div>
            </div>
            <div className="flex absolute dots-container">
              <DeepDots dotsNumber={5} dotsRows={5} dotsOpacity={0.6} />
              <DeepDots dotsNumber={5} dotsRows={5} dotsOpacity={0.5} />
              <DeepDots dotsNumber={5} dotsRows={5} dotsOpacity={0.4} />
              <DeepDots dotsNumber={5} dotsRows={5} dotsOpacity={0.3} />
              <DeepDots dotsNumber={5} dotsRows={5} dotsOpacity={0.2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
