import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    title: "CPU",
    image: "http://localhost:3000/uploads/intel_core_i9-13900KF.png",
    url: "CPU",
  },
  {
    id: 2,
    title: "GPU",
    image: "http://localhost:3000/uploads/geForce_rtx_4070_ti.png",
    url: "GPU",
  },
  {
    id: 3,
    title: "RAM",
    image: "http://localhost:3000/uploads/ram-vengeance.png",
    url: "RAM",
  },
  {
    id: 4,
    title: "SSD",
    image: "http://localhost:3000/uploads/lexar-2tb.png",
    url: "SSD",
  },
  {
    id: 5,
    title: "MONITOR",
    image: "http://localhost:3000/uploads/samsung-viewfinity.png",
    url: "Monitor",
  },
  {
    id: 6,
    title: "MOUSE",
    image: "http://localhost:3000/uploads/logitech-g502.png",
    url: "Mouse",
  },
  {
    id: 7,
    title: "KEYBOARD",
    image: "http://localhost:3000/uploads/corsair-k70.png",
    url: "Keyboard",
  },
  {
    id: 8,
    title: "HEADSET",
    image: "http://localhost:3000/uploads/corsair-hs65.png",
    url: "Headset",
  },
];

export function CarouselGear() {
  const navigate = useNavigate();

  function handleCategorySelected(category) {
    navigate(`/gear/${category}`);
  }

  return (
    <div className="gear-slider">
      <div className="gear-slide-cards">
        {cards.concat(cards).map((card, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelected(card.url)}
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
