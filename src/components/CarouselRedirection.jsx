/*React Component author Domenico*/

import { useParams } from "react-router-dom";
import GearCollection from "./GearCollection";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { useEffect, useState } from "react";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";

export function CarouselRedirection() {
  const { category } = useParams();
  const { data, error, loading } = useGetFetch("products/gears");
  const [filteredArray, setFilteredArray] = useState(null);

  useEffect(() => {
    if (data) {
      setFilteredArray(data.filter((item) => item.gear === category));
    }
  }, [data, category]);

  useEffect(() => {
    console.log(filteredArray);
  }, [filteredArray]);

  return (
    <>
      {loading && <LoadingMessage />}
      {error && <ErrorMessage error={"error"} />}
      {filteredArray && <GearCollection products={filteredArray} />}
    </>
  );
}
