/* Component Author Andrea */

export function ShippingStatusString({ status }) {
  return (
    <span
      className={
        status === "Pending"
          ? "grey"
          : status === "Working on it"
          ? "fuscia"
          : status === "Canceled"
          ? "red"
          : status === "On its way"
          ? "orange"
          : status === "Delivered"
          ? "green"
          : status === "Returned"
          ? "red"
          : status === "Failed"
          ? "red"
          : ""
      }
    >
      {status}
    </span>
  );
}
