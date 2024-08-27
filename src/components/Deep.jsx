import { Outlet, useNavigate } from "react-router-dom";
import { NodeDeep } from "./NodeDeep";
import andreaHacker from "../assets/andrea-hacker.png";
import { DeepDots } from "./DeepDots";
import { useRandom } from "../custom-hooks/useRandom";
import { DeepRandomString } from "./DeepRandomString";
import { Button } from "./Button";
import { useResponsiveWidth } from "../custom-hooks/useResponsiveWidth";
import { useEffect, useState } from "react";
import { useChat, useRender, useSpeaking } from "./ChatProvider";
import { useLocalUser } from "../custom-hooks/useLocalUser";
import { upperCaseString } from "../custom-hooks/uppercaseString";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";
import { DeepAdvertisement } from "./DeepAdvertisement";

export function Deep() {
  const { user, refreshUser } = useLocalUser();
  const navigate = useNavigate();
  const { screenWidth } = useResponsiveWidth();
  const chat = useChat();
  const setChat = useSpeaking();
  const { render } = useRender();
  const [filteredProducts, setFilteredProducts] = useState(null);

  const { data, error, loading } = useGetFetch("products/gears");

  useEffect(() => {
    setChat("Choose a Node");
    refreshUser();
  }, []);

  useEffect(() => {
    setChat("Choose another Node");
    refreshUser();
  }, [render]);

  useEffect(() => {
    if (data) {
      setFilteredProducts(data.filter((item) => item.discount));
    }
  }, [data]);

  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);

  return (
    <div
      className={`flex ${
        screenWidth <= 1280 ? "flex-col items-center" : ""
      } deep`}
    >
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
        <div className="relative curl-effect"></div>
        <div className="flex flex-col absolute nodes-container">
          {user.games.map((game) => (
            <NodeDeep
              key={game.id}
              employee={
                screenWidth > 1280
                  ? upperCaseString(game.name)
                  : game.employeeId
              }
              path={game.name}
              gameCleared={game.completed}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between deep-main">
        <div className="flex items-center justify-center top-main">
          <div className="flex flex-row-reverse dots">
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.6}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.6}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.5}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.5}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.4}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.4}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.3}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.3}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.2}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.2}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.1}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.1}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.05}
            />
            <DeepDots
              dotsNumber={screenWidth > 1280 ? 8 : 4}
              dotsRows={screenWidth > 1280 ? 8 : 4}
              dotsOpacity={0.02}
            />
          </div>
          {screenWidth > 1280 && (
            <div className="flex flex-col promo-card">
              <div className="flex relative mock-webmenu">
                <div className="flex justify-center items-center relative tab-cover">
                  <div className="flex justify-center items-center red-dot">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x not-show"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                  <div className="flex justify-center items-center yellow-dot">
                    <p className="mock-drop-down not-show">-</p>
                  </div>
                  <div className="flex flex-col justify-center items-center relative green-dot">
                    <div className="absolute triangle up-left not-show"></div>
                    <div className="absolute triangle bottom-right not-show"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center self-end relative mock-tab">
                  <img src={andreaHacker} alt="mock favicon" />
                  <p>Nebula Tech 1</p>
                  <div className="flex justify-center items-center mock-close-tab">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-bg"></div>
                </div>
                <div className="relative tab-cover"></div>
                <div className="flex items-center justify-center absolute mock-searching-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </div>
              <div className="relative flex items-center justify-center card-carousel">
                {loading && <LoadingMessage />}
                {error && (
                  <ErrorMessage
                    error={"Couldn't retieve information from the main website"}
                  />
                )}
                {filteredProducts &&
                  filteredProducts.map((item) => (
                    <DeepAdvertisement key={item.id} item={item} />
                  ))}
                <div
                  className="flex items-center justify-center absolute quit-deep"
                  onClick={() => navigate("/")}
                >
                  <Button text={"Quit Hacking"} />
                </div>
              </div>
            </div>
          )}

          {screenWidth < 1280 && (
            <div className="quit-deep" onClick={() => navigate("/")}>
              <Button text={"Exit Hacking"} />{" "}
            </div>
          )}
        </div>

        <div className="relative main-game">
          <div className="flex justify-center items-center game">
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
          <div className="flex flex-col items-start absolute random-strings">
            <DeepRandomString stringLength={13} />
            <DeepRandomString stringLength={8} />
            <DeepRandomString stringLength={22} />
          </div>
        </div>

        <div className="flex items-end chat">
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
              <p className="absolute">{chat}</p>
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
            <div className="flex flex-col items-end absolute random-strings">
              <DeepRandomString stringLength={14} />
              <DeepRandomString stringLength={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
