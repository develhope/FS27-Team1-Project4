/* Component Author Andrea */

import { useEffect } from "react";
import { useResponsiveWidth } from "../custom-hooks/useResponsiveWidth";
import { upperCaseString } from "../custom-hooks/uppercaseString";

export function AdminProductsFilter({ name, filter, setFilter, type }) {
  const { screenWidth } = useResponsiveWidth();

  function handleCheckbox(event, value) {
    if (event.target.checked) {
      setFilter(value);
    } else {
      setFilter("");
    }
  }

  return (
    <>
      {screenWidth < 768 && (
        <label htmlFor={name} className="flex justify-between single-filter">
          {" "}
          {upperCaseString(name)}:
          <select
            id={name}
            name={name}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value={""}>No Filter</option>
            {type.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      )}
      {screenWidth >= 768 && (
        <div className="flex flex-col gap-2">
          <p>{upperCaseString(name)}:</p>
          <div className="flex flex-col">
            {type.map((t, index) => (
              <label key={index} htmlFor={t}>
                <input
                  type="checkbox"
                  id={t}
                  name={t}
                  checked={filter === t ? true : false}
                  onChange={(event) => handleCheckbox(event, t)}
                />{" "}
                {t}
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
