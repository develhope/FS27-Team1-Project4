import { BuildYourPc } from "./BuildYourPc";
import { CarouselOffer } from "./CarouselOffer";
import { Builded } from "./Builded";
import { CarouselGear } from "./CarouselGear";
import { SiteGuide } from "./SiteGuide";
import { Newsletter } from "./Newsletter";
import Banner from "./Banner";
import AboutUs from "./AboutUs";

export function Home() {
  return (
    <div id="home" className="home">
      <Banner />
      <Builded />
      <CarouselOffer />
      <BuildYourPc />
      <CarouselGear />      
      <SiteGuide />
      <Newsletter />
      </div>
  );
}
