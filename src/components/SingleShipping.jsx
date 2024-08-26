/*Component Author Andrea */

import { useNavigate } from "react-router-dom";
import { ShippingStatusIcon } from "./ShippingStatusIcon";
import { ShippingStatusString } from "./ShippingStatusString";
import { AdminShippingUpdate } from "./AdminShippingUpdate";
import { useEffect, useState } from "react";

export function SingleShipping({ shipping, admin = false, onRefresh }) {
  const navigate = useNavigate();
  const [productsId, setProductsId] = useState([])

  useEffect(() => {
    let tempProductsList = []
    if (shipping.gearList && shipping.pcList) {
      tempProductsList = [...shipping.gearList, ...shipping.pcList]
    }

    if (shipping.gearList && !shipping.pcList) {
      tempProductsList = [...shipping.gearList]
    }

    if (!shipping.gearList && shipping.pcList) {
      tempProductsList = [...shipping.pcList]
    }

    const listOfIds = tempProductsList.map(item => item.id)

    setProductsId(listOfIds)
  },[shipping])

  return (
    <div
      className="flex flex-col items-center admin-product"
      onClick={() => navigate(`/shipping/${shipping.id}`)}
    >
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
      {admin && <AdminShippingUpdate id={shipping.id} order={productsId} onRefresh={onRefresh}/>}
    </div>
  );
}
