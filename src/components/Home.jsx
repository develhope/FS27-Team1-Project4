import { BuildYourPc } from "./BuildYourPc";
import { CarouselOffer } from "./CarouselOffer";
import { Builded } from "./Builded";
import { CarouselGear } from "./CarouselGear";
import { SiteGuide } from "./SiteGuide";

export function Home() {
  return (
    <div id="home" className="home">
      <Builded />
      <CarouselOffer />
      <BuildYourPc/>
      <CarouselGear />
      <SiteGuide />
    </div>
  );
}
