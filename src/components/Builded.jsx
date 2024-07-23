import React from "react";
import { Button } from "./Button";

export function Builded() {
  return (
    <div className="builded-container">
      <div className="header">
        <button className="back-button">{"<"}</button>
        <button className="next-button">{">"}</button>
      </div>
      <div className="content">
        <img
          src="/images/Screenshot-2024-07-15-145549.png"
          alt="Gaming PC"
          className="pc-image"
        />
        <div className="details">
          <h2 className="title">BEST GAMING PC</h2>
          <h3 className="subtitle">PREBUILD & CUSTOM</h3>
          <h4 className="model">RDI Y70 001</h4>
          <div className="price-section">
            <span className="discount">Save $350</span>
            <span className="price">$2,249</span>
            <span className="original-price">$2,599</span>
          </div>
          <ul className="specs">
            <li>Windows 11 Home</li>
            <li>Intel® Core™ i9-14900KF CPU</li>
            <li>geForce RTX 4070 Ti SUPER - 16GB</li>
            <li>2TB M.2 NVMe Gen4 SSD</li>
            <li>32GB DDR5-6000MHz RGB RAM</li>
          </ul>
         <Button text={"BUY NOW"} />
        </div>
      </div>
    </div>
  );
}
