import { RandomSigns } from "./RandomSigns";
import { RandomWord } from "./RandomWord";

export function SpotTheWordRandomLine({ word, handleComparison }) {
  return (
    <div className="flex flex-col flex-wrap">
      <div className="flex flex-wrap h-full">
        <RandomSigns
          number={3}
          className="break-all hover:bg-bios-green hover:text-white"
        />
        <RandomWord
          number={5}
          className={"break-all hover:bg-bios-green hover:text-white"}
        />
        <RandomSigns
          number={3}
          className="break-all hover:bg-bios-green hover:text-white"
        />
        <p
          className="single-random-line"
          onClick={handleComparison}
        >
          {word}
        </p>
        <RandomSigns
          number={3}
          className="break-all hover:bg-bios-green hover:text-white"
        />
        <RandomWord
          number={5}
          className={"break-all hover:bg-bios-green hover:text-white"}
        />
      </div>
    </div>
  );
}
