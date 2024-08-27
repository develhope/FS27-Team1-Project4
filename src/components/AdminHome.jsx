/* Component Author Andrea */

import { Link, Outlet } from "react-router-dom";
import whiteLogo from "../assets/nebula-tech-1-logo-w.png";
import { useRender } from "./ChatProvider";

export function AdminHome() {
  const {onRender} = useRender()
  return (
    <div className="flex justify-end relative admin-home">
      <div className="flex fixed admin-sidebar">
        <div className="flex flex-col admin-sidebar-content">
          <img src={whiteLogo} alt="" />
          <div className="flex flex-col link-list">
            <Link to="/admin" className="link">
              Admin Menù
            </Link>
            <Link to="users-list" className="link">
              Users List
            </Link>
            <Link to="newsletter-subscribed" className="link">
              Subscribed on Newsletter
            </Link>
            <Link to="products-list" className="link">
              Products
            </Link>
            <Link to="add-product/gear" className="link" onClick={onRender}>
              Add Gear
            </Link>
            <Link to="add-product/pc" className="link" onClick={onRender}>
              Add Pc
            </Link>
            <Link to="shippings" className="link">
              Users Orders
            </Link>
          </div>
        </div>
        <div className="admin-sidebar-border">
          <div className="border-line"></div>
        </div>
      </div>
      <div className="admin-outlet">
        <Outlet />
      </div>
    </div>
  );
}
