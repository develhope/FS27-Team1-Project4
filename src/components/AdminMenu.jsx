/*React Component author Domenico*/

import { Link } from "react-router-dom";

export function AdminMenu() {
  return (
    <div className="admin-menu">
      <div className="flex flex-col link-list-admin-menu">
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
        <Link to="add-product/gear" className="link">
          Add Gear
        </Link>
        <Link to="add-product/pc" className="link">
          Add Pc
        </Link>
        <Link to="shippings" className="link">
          Users Orders
        </Link>
      </div>
    </div>
  );
}
