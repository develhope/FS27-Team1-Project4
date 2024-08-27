/* Component Author Andrea */

import { DeepDots } from "./DeepDots";
import { DeepNodule } from "./DeepNodule";
import { DeepRandomString } from "./DeepRandomString";

export function DeepStolenNode({stolen, setStolen, id}) {
  return <div className={`flex items-center justify-center relative stolen ${stolen ? "is-stolen" : ""}`}>
    <div className="base">
      <div className="diagonal-left"></div>
      <div className="diagonal-right"></div>
      <div className="perpendicular-base"></div>
      <div className="darker-diagonal"></div>
      <div className="darker-perpendicular"></div>
      <div className="top-layer-cover"></div>
      <div className="top-layer-cover-perpendicular"></div>
      <div className="lighter-diagonal"></div>
      <div className="lighter-center"></div>
      <div className="max-top-diagonal"></div>
      <div className="flex justify-end items-center top-center">
        <DeepDots dotsOpacity={0.2}/>
        <DeepDots dotsOpacity={0.4}/>
        <DeepDots dotsOpacity={0.6}/>
        <DeepDots dotsOpacity={0.7}/>
      </div>
      <div className="first-nodule-container">
        <DeepNodule />
      </div>
      <div className="second-nodule-container">
        <DeepNodule />
      </div>
      <div className="third-nodule-container">
        <DeepNodule />
      </div>
      <div className="forth-nodule-container">
        <DeepNodule />
      </div>
      <div className="band-background"></div>
      <div className="band-border"></div>
      <div className="random-number-container">
        <div><DeepRandomString stringLength={9}/></div>
      </div>
      <div className="game-name-container">
        {id}
      </div>
    </div>
  </div>
}
