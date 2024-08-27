/*Component author: Andrea*/
import nebulaTechLogo from "../assets/nebula-tech-1-logo-col.png"
import { useEffect, useRef } from "react";
import { NavbarBorder } from "./NavbarBorder";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarSidebarCurtains } from "./NavbarSidebarCurtains";
import { imageDomain } from "../custom-hooks/usePostImage";
import { useLocalUser } from "../custom-hooks/useLocalUser";

export function NavbarSidebar({ sidebar, closeSidebar, itsClosing }) {
  const sidebarRef = useRef(null);
  const {user} = useLocalUser()

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
    {
      img: imageDomain + "uploads/all_gears.png",
      url: "products",
      name: "All Gears",
    },
    {
      img: imageDomain + "uploads/geForce_rtx_4070_ti.png",
      url: "products",
      name: "GPU",
    },
    {
      img: imageDomain + "uploads/lexar-2tb.png",
      url: "products",
      name: "SSD",
    },
    {
      img: imageDomain + "uploads/intel-core-i7.png",
      url: "products",
      name: "CPU",
    },
    {
      img: imageDomain + "uploads/ram-vengeance.png",
      url: "products",
      name: "RAM",
    },
    {
      img: imageDomain + "uploads/samsung-viewfinity.png",
      url: "products",
      name: "Monitor",
    },
    {
      img: imageDomain + "uploads/corsair-k70.png",
      url: "products",
      name: "Keyboard",
    },
    {
      img: imageDomain + "uploads/logitech-g502.png",
      url: "products",
      name: "Mouse",
    },
    {
      img: imageDomain + "uploads/corsair-hs65.png",
      url: "products",
      name: "Headset",
    },
    { img: imageDomain + "uploads/pc1.png", url: "computer", name: "Pc" },
  ];
  const contacts = [
    { url: "contact", name: "Contact Us" },
    { url: "faq", name: "Faq" },
    { url: "tickets", name: "Opened Tickets" },
  ];
  const loginArray = [
    { url: "login", name: "Login" },
    { url: "sign-up", name: "Sign Up" },
    { url: user ? "user-profile" : "login", name: "Profile" },
    { url: user ? "shipping-list" : "login", name: "Orders" },
  ];

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
            <div className="flex flex-col justify-between sidebar-content">
              <div className="flex flex-col">
              <NavbarSearch
                sidebar={sidebar}
                closeSidebar={handleCloseSidebar}
              />
              <div className="flex flex-col sidebar-links-container">
                <NavbarSidebarCurtains
                  title={"TEST"}
                  arrayLinks={linksWithImages}
                />
                <NavbarSidebarCurtains title={"User"} arrayLinks={loginArray} sidebar={sidebar} handleOnClick={closeSidebar}/>
                <NavbarSidebarCurtains title={"Products"} arrayLinks={linksWithImages} sidebar={sidebar} handleOnClick={closeSidebar}/>
                <NavbarSidebarCurtains title={"Contacts"} arrayLinks={contacts} sidebar={sidebar} handleOnClick={closeSidebar}/>
              </div>
              </div>
            <div className="flex justify-center w-full sidebar-image-container">
              <img src={nebulaTechLogo} alt="logo" />
            </div>
            </div>
            <NavbarBorder />
          </div>
        </div>
      )}
    </>
  );
}
