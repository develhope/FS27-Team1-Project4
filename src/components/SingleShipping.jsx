/*Component Author Andrea */

import { useNavigate } from "react-router-dom";
import { ShippingStatusIcon } from "./ShippingStatusIcon";
import { ShippingStatusString } from "./ShippingStatusString";

export function SingleShipping({ shipping, admin = false }) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center admin-product" onClick={() => navigate(`/shipping/${shipping.id}`)}>
      <div className="flex items-center justify-between w-full shipping-header">
        <div className="flex items-center justify-center shipping-icon-container">
          <ShippingStatusIcon status={shipping.status} />
        </div>
        <div className="flex justify-center items-center shipping-number">
          <h3>{shipping.number}</h3>
        </div>
      </div>
      <div
        className={`flex items-center ${
          admin ? "justify-between" : "justify-center"
        } status-and-user`}
      >
        {admin && (
          <p>
            User: <span className="orange">{shipping.user}</span>
          </p>
        )}
        <div className="flex items-center status-container">
          <p>status:</p>
          <ShippingStatusString status={shipping.status} />
        </div>
      </div>
    </div>
  );
}
