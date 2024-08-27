/* Component author: Andrea */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function NavbarSidebarCurtains({ title, arrayLinks, sidebar, handleOnClick }) {
  const [shown, setShown] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (sidebar) {
      setTimeout(() => setShowButton(true), 300);
    }

    if (!sidebar) {
      setShowButton(false);
    }

    return () => {
      setShowButton(false);
    };
  }, [sidebar]);

  return (
    <div
      onMouseOver={() => setShown(true)}
      onMouseOut={() => setShown(false)}
      className={`${showButton ? "flex" : "hidden"} flex-col`}
    >
      <div
        className={`flex justify-center items-stretch enable-search ${
          shown ? "sidebar-button-hover" : ""
        }`}
      >
        <div
          className={`flex items-center sidebar-buttons ${
            shown ? "search-button" : ""
          }`}
        >
          <p>{title}</p>
        </div>
      </div>
      {shown && (
        <div className="flex justify-center items-center border-2 border-black enable-search search-enabled">
          <div className="flex flex-col curtain-sidebar">
            {arrayLinks.map((link, index) => (
              <div key={index}>
                {(typeof link === "object" && <Link to={link.url} onClick={handleOnClick}>{link.name}</Link>) || (
                  <p>{link}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
