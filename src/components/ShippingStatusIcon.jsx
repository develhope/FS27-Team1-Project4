/*Component Author Andrea */

import { GiReturnArrow } from "react-icons/gi";
import { SiClockify } from "react-icons/si";
import { FaUsersGear } from "react-icons/fa6";
import { TbLocationCancel } from "react-icons/tb";
import { MdRocketLaunch } from "react-icons/md";
import { SiHomeadvisor } from "react-icons/si";
import { MdSmsFailed } from "react-icons/md";

export function ShippingStatusIcon({ status }) {
  return (
    <div className="flex items-center justify-center shipping-icon-status">
      {status === "Pending" && <SiClockify className="icon-status" />}
      {status === "Working on it" && <FaUsersGear className="icon-status" />}
      {status === "Canceled" && <TbLocationCancel className="icon-status" />}
      {status === "On its way" && <MdRocketLaunch className="icon-status" />}
      {status === "Delivered" && <SiHomeadvisor className="icon-status" />}
      {status === "Returned" && <GiReturnArrow className="icon-status" />}
      {status === "Failed" && <MdSmsFailed className="icon-status" />}
    </div>
  );
}
