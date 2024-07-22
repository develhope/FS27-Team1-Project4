/*Component author: Andrea */

import { useEffect, useRef, useState } from "react";

export function NavbarSearch({ sidebar, closeSidebar }) {
  const [search, setSearch] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    console.log(sidebar);
    if (search) {
      if (searchRef?.current) {
        setTimeout(() => searchRef.current.focus(), 400);
      }
    }
  }, [search]);

  return (
    <div
      className={`flex justify-center items-center ${
        sidebar ? "" : "relative hidden-when-small"
      }`}
    >
      <div
        className={`flex items-center ${
          sidebar ? "" : "absolute"
        } search-not-shown ${search || sidebar ? "search-shown" : ""}`}
      >
        <div className="flex justify-center align-center search-container">
          <input
            type="text"
            placeholder="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            ref={searchRef}
          />
        </div>
        <div
          className={`flex justify-center items-center border-l-2 border-black enable-search ${
            closeSearch ? "search-enabled" : ""
          }`}
        >
          <button
            className={`flex justify-center items-center close-search ${
              closeSearch || sidebar ? "search-button" : ""
            }`}
            onMouseOver={() => setCloseSearch(true)}
            onMouseOut={() => setCloseSearch(false)}
            onClick={() => {
              if (sidebar) {
                closeSidebar();
              } else {
                setSearch(false);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className={`bi bi-x ${closeSearch ? "svg-search" : ""}`}
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
      {!sidebar && (
        <div
          className={`flex justify-center items-center relative enable-search ${
            search ? "search-enabled" : ""
          }`}
        >
          <button
            className={`flex justify-center items-center ${
              search ? "search-button" : ""
            }`}
            onClick={() => {
              setSearch(!search);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-search svg-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
