/* Component author: Andrea*/

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { upperCaseString } from "../custom-hooks/uppercaseString.js";

export function NavbarCurtains({ title, arrayLinks , login }) {
  const [sidebarIsShown, setSidebarIsShown] = useState(false);
  const [sidebarContentShown, setSidebarContentShow] = useState(false);
  const navigate = useNavigate()

  const productNavbarRef = useRef(null);
  const linkNavbarRef = useRef(null);

  useEffect(() => {
    if (sidebarIsShown) {
      setTimeout(() => setSidebarContentShow(true), 300);
      if (productNavbarRef?.current) {
        setTimeout(
          () => productNavbarRef.current.classList.add("product-navbar-shown"),
          100
        );
      }
      if (linkNavbarRef?.current) {
        setTimeout(
          () => linkNavbarRef.current.classList.add("link-menu-shown"),
          100
        );
      }
    } else {
      setSidebarContentShow(false);
      productNavbarRef.current?.classList.remove("product-navbar-shown");
      linkNavbarRef.current?.classList.remove("link-menu-shown");
    }
  }, [sidebarIsShown]);

  return (
    <div
      className="flex items-center justify-center relative links-container"
      onMouseOver={() => {
        setSidebarIsShown(true);
      }}
      onMouseOut={() => {
        setSidebarIsShown(false);
      }}
    >
      <div
        className={`flex justify-center  outer-button-fixed ${
          sidebarIsShown ? "outer-button" : ""
        }`}
      >
        <div
          className={`flex justify-center items-center curtain ${
            sidebarIsShown ? "hovered" : ""
          }`}
        >
          {title && (
            <>
              <h4>{title}</h4>
              <div className="link-light"></div>
            </>
          )}
          {login && (
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className={`bi bi-person-fill login-svg ${
                  sidebarIsShown ? "svg-hovered" : ""
                }`}
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Shows the sidebar of the products with the images */}
      {sidebarIsShown && arrayLinks[0].img && (
        <div className="absolute ghost-div-with-img">
          <div
            className={`flex justify-center items-center fixed product-navbar-not-shown`}
            ref={productNavbarRef}
          >
            {sidebarContentShown &&
              arrayLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between items-center flex-1"
                >
                  <div className="flex justify-center items-center h-full products-image-container">
                  <img src={link.img} alt="product img" onClick={() => navigate(link.url)}/>
                  </div>
                  <Link to={link.url}>{link.name}</Link>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Shows the sidebar with kust links */}
      {sidebarIsShown && !arrayLinks[0].img && (
        <div className="absolute ghost-div">
          <div
            className="flex flex-col absolute link-menu-not-shown"
            ref={linkNavbarRef}
          >
            {arrayLinks.map((link, index) => (
              <Link
                className={`${sidebarContentShown ? "shown" : ""}`}
                key={index}
                to={link.url}
              >
                <p>{upperCaseString(link.name)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!arrayLinks[0] && (
        <></>
      )}
    </div>
  );
}
