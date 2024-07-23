import { BuildYourPc } from "./BuildYourPc";
import { CarouselOffer } from "./CarouselOffer";
import { Builded } from "./Builded";
export function Home() {
  return (
    <div id="home" className="home">
      <Builded />
      <CarouselOffer />
      <BuildYourPc />
    </div>
  );
}
