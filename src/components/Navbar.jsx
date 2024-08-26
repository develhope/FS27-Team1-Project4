/* Component author: Andrea*/

import { MetalBg } from "./MetalBg";
import { NavbarCurtains } from "./NavbarCurtains";
import "../style/navbar.scss";
import { NavbarBorder } from "./NavbarBorder";
import { useEffect, useRef, useState } from "react";
import { NavbarSidebar } from "./NavbarSidebar";
import { NavbarSearch } from "./NavbarSearch";
import { useNavigate, Link } from "react-router-dom";
import nebulaLogo from "../assets/nebula-tech-1-logo-b.png"
import {useLocalUser} from "../custom-hooks/useLocalUser"
import { imageDomain } from "../custom-hooks/usePostImage";

import { HiOutlineShoppingCart } from "react-icons/hi2";

export function Navbar() {
  const {user} = useLocalUser()
  const [search, setSearch] = useState(false);
  const [closeSearch, setCloseSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [itsClosing, setItsClosing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (search) {
      if (searchRef?.current) {
        setTimeout(() => searchRef.current.focus(), 400);
      }
    }
  }, [search]);

  const links = ["Link1", "Link2", "Link3"];
  const contacts = [{url:"contact", name:"Contact Us"}, {url:"faq", name: "Faq"}, {url:"tickets", name: "Opened Tickets"}]
  const products = [{url: "products", name:"Products"} , {url:"computer", name: "PC"}]
  const admin = [{url:"admin", name:"Admin"}]
  const linksWithImages = [
    { img: imageDomain + "uploads/all_gears.png", url: "products", name: "All Gears" },
    { img: imageDomain + "uploads/geForce_rtx_4070_ti.png", url: "products", name: "GPU" },
    { img: imageDomain + "uploads/lexar-2tb.png", url: "products", name: "SSD" },
    { img: imageDomain + "uploads/intel-core-i7.png", url: "products", name: "CPU" },
    { img: imageDomain + "uploads/ram-vengeance.png", url: "products", name: "RAM" },
    { img: imageDomain + "uploads/samsung-viewfinity.png", url: "products", name: "Monitor" },
    { img: imageDomain + "uploads/corsair-k70.png", url: "products", name: "Keyboard" },
    { img: imageDomain + "uploads/logitech-g502.png", url: "products", name: "Mouse" },
    { img: imageDomain + "uploads/corsair-hs65.png", url: "products", name: "Headset" },
    { img: imageDomain + "uploads/pc1.png", url: "computer", name: "Pc" },
  ];
  const loginArray = [{url:"login", name: "Login"}, {url: "sign-up", name: "Sign Up"}, {url: user ? "user-profile" : "login", name: "Profile"}, {url:user ? "shipping-list" : "login", name:"Orders"}];

  return (
    <div className="flex justify-between items-center fixed navbar">
      <MetalBg>
        <div className="flex justify-between align-center shade">
          <div className="flex items-center">
            <div className="flex logo-and-login-container" >
              <img src={nebulaLogo} alt="logo" onClick={() => navigate("/access")} />
              <Link to="/" className="flex items-center link"><h4 className="home-link">NEBULA TECH 1</h4></Link>
            </div>
            <div className="flex items-center justify-center links">
              <NavbarCurtains title="TEST" arrayLinks={linksWithImages} />
              <NavbarCurtains title="products" arrayLinks={products} />
              <NavbarCurtains title="Contacts" arrayLinks={contacts} />
              <NavbarCurtains title="admin" arrayLinks={admin} />
            </div>
          </div>
          <div className="flex items-center logo-and-login-container">
            <NavbarSearch />
            <div className="flex items-center justify-center navbar-cart"
            onClick={() => navigate("cart")}>
            <HiOutlineShoppingCart />
            </div>
            <div className="flex items-center justify-center links login">
              <NavbarCurtains login={true} arrayLinks={loginArray} />
            </div>
            <div
              className={`flex justify-center items-center relative enable-search sidebar ${
                sidebar ? "search-enabled" : ""
              }`}
            >
              <button
                onClick={() => {
                  if (sidebar) {
                    setItsClosing(!itsClosing);
                  } else {
                    setSidebar(true);
                  }
                }}
                className={`flex justify-center items-center ${
                  sidebar ? "search-button" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-layout-sidebar svg-search svg-sidebar"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <NavbarBorder />
      </MetalBg>
      <NavbarSidebar
        sidebar={sidebar}
        closeSidebar={() => {
          setSidebar(false);
          setItsClosing(false);
        }}
        itsClosing={itsClosing}
      />
    </div>
  );
}
