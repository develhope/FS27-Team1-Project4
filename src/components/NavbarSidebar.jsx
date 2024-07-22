/*Component author: Andrea*/

import { useEffect, useRef } from "react";
import { NavbarBorder } from "./NavbarBorder";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarSidebarCurtains } from "./NavbarSidebarCurtains";

export function NavbarSidebar({ sidebar, closeSidebar, itsClosing }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (sidebarRef?.current) {
      setTimeout(() => sidebarRef.current.classList.add("open-sidebar"), 100);
    }
  }, [sidebar]);

  useEffect(() => {
    if (itsClosing) {

      sidebarRef.current?.classList.remove("open-sidebar");

      handleCloseSidebar();
    }
  }, [itsClosing]);

  function handleCloseSidebar() {

    setTimeout(closeSidebar, 300);
  }

  const links = ["Link1", "Link2", "Link3"];
  const linksWithImages = [
    { img: "../src/assets/mock-product-navbar.png", product: "LINK 1" },
    { img: "../src/assets/mock-product-navbar.png", product: "LINK 2" },
    { img: "../src/assets/mock-product-navbar.png", product: "LINK 3" },
  ];
  const loginArray = ["Test 1", "Test2"];

  return (
    <>
      {sidebar && (
        <div
          className="flex fixed sidebar-container"
          onClick={handleCloseSidebar}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            ref={sidebarRef}
            className={`flex justify-between absolute sidebar`}
          >
            <div className="flex flex-col sidebar-content">
              <NavbarSearch
                sidebar={sidebar}
                closeSidebar={handleCloseSidebar}
              />
              <div className="flex flex-col sidebar-links-container">
                <NavbarSidebarCurtains
                  title={"TEST"}
                  arrayLinks={linksWithImages}
                />
                <NavbarSidebarCurtains title={"TEST"} arrayLinks={links} sidebar={sidebar}/>
                <NavbarSidebarCurtains title={"TEST"} arrayLinks={links} sidebar={sidebar}/>
                <NavbarSidebarCurtains title={"TEST"} arrayLinks={links} sidebar={sidebar}/>
              </div>
            </div>
            <NavbarBorder />
          </div>
        </div>
      )}
    </>
  );
}
