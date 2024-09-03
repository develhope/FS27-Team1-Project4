import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export function ImagesForRiddle({
  image,
  setterFunctionDec,
  setterFunctionInc,
  riddle,
}) {
  return (
    <>
      <div className="flex flex-col items-center images">
        <img src={image} alt="Riddle-Image" />

        <div className="flex justify-between change-image">
          <button onClick={setterFunctionDec}>
            <GoChevronLeft />
          </button>
          <button onClick={setterFunctionInc}>
            <GoChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}
