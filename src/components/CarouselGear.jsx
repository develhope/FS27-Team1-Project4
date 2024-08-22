const cards = [
  {
    id: 1,
    title: "CPU",
    image: "http://localhost:3000/uploads/intel_core_i9-13900KF.png",
  },
  {
    id: 2,
    title: "GPU",
    image: "http://localhost:3000/uploads/geForce_rtx_4070_ti.png",
  },
  {
    id: 3,
    title: "RAM",
    image: "http://localhost:3000/uploads/ram-vengeance.png",
  },
  {
    id: 4,
    title: "SSD",
    image: "http://localhost:3000/uploads/lexar-2tb.png",
  },
  {
    id: 5,
    title: "MONITOR",
    image: "http://localhost:3000/uploads/samsung-viewfinity.png",
  },
  {
    id: 6,
    title: "MOUSE",
    image: "http://localhost:3000/uploads/logitech-g502.png",
  },
  {
    id: 7,
    title: "KEYBOARD",
    image: "http://localhost:3000/uploads/corsair-k70.png",
  },
  {
    id: 8,
    title: "HEADSET",
    image: "http://localhost:3000/uploads/corsair-hs65.png",
  },
];
//array per le card, da compilare

export function CarouselGear() {
  return (
    <div className="gear-slider">
      <div className="gear-slide-cards">
        {cards.concat(cards).map((card, index) => (
          <div
            key={index}
            className={`cardGear ${
              index % 2 === 0
                ? "cardGear-border-color1"
                : "cardGear-border-color2"
            }`}
          >
            <div
              className={`cardGear-overlay ${
                index % 2 === 0 ? "gradientColor1" : "gradientColor2"
              }`}
            ></div>
            <p
              className={`cardGear-title ${
                index % 2 === 0 ? "title-color2" : "title-color1"
              }`}
            >
              {card.title}
            </p>

            {/*             <p className="cardGear-subtitle">{card.sub_title}</p>
             */}
            <div className="cardGear-container-image">
              <img
                className="cardGear-image"
                src={card.image}
                alt={`Slide ${index}`}
              />
            </div>
            <button
              className={`cardGear-button ${
                index % 2 === 0 ? "button-text-color2" : "button-text-color1"
              }`}
            >
              SHOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
