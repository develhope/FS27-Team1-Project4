/*Component Author Andrea */

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useFetch } from "../custom-hooks/useFetch";

export function AdminShippingUpdate({ id, order, onRefresh }) {
  const [status, setStatus] = useState("Pending");
  const [onUpdateStatus, statusData, statusError] = useFetch(`shipping/update-status/${id}`, "PUT")

  async function handleUpdateStatus() {
    try {
      const response = await onUpdateStatus({status, order})

      if (statusError) {
        alert(statusError)
        throw new Error(statusError)
      }

      alert(response.msg)
      await onRefresh()

    } catch (error) {
      alert("Something went wrong")
      throw new Error(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-between changing-shipping-status">
      <select
        name="status"
        id="status"
        onClick={(event) => event.stopPropagation()}
        onChange={(event) => setStatus(event.target.value)}
        value={status}
      >
        <option value="Pending">Pending</option>
        <option value="Working on it">Working on it</option>
        <option value="Canceled">Canceled</option>
        <option value="On its way">On its way</option>
        <option value="Delivered">Delivered</option>
        <option value="Returned">Returned</option>
        <option value="Failed">Failed</option>
      </select>
      <div
        className="update-button"
        onClick={(event) => {
          event.stopPropagation();
          handleUpdateStatus()
        }}
      >
        <Button text="Update Status" />
      </div>
    </div>
  );
}
