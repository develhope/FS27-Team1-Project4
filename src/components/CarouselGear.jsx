const cards = [
  {
    id: 1,
    title: "card1",
    sub_title: "sub title 1",
    image: "/src/assets/h.webp",
  },
  {
    id: 2,
    title: "card2",
    sub_title: "sub title 2",
    image: "/src/assets/h.webp",
  },
  {
    id: 3,
    title: "card3",
    sub_title: "sub title 3",
    image: "/src/assets/h.webp",
  },
  {
    id: 4,
    title: "card4",
    sub_title: "sub title 4",
    image: "/src/assets/h.webp",
  },
  {
    id: 5,
    title: "card5",
    sub_title: "sub title 5",
    image: "/src/assets/h.webp",
  },
  {
    id: 6,
    title: "card6",
    sub_title: "sub title 6",
    image: "/src/assets/h.webp",
  },
  {
    id: 7,
    title: "card7",
    sub_title: "sub title 7",
    image: "/src/assets/h.webp",
  },
  {
    id: 8,
    title: "card8",
    sub_title: "sub title 8",
    image: "/src/assets/h.webp",
  },
];
//array per le card, da compilare

export function CarouselGear() {
  return (
    <div className="gear-slider">
      <div className="gear-slide-cards">
        {cards.concat(cards).map((card, index) => (
          <div key={index} className="card">
            <div
              className={`card-overlay ${
                index % 2 === 0 ? "color1" : "color2"
              }`}
            ></div>
            <p className="card-title">{card.title}</p>
            <p className="card-subtitle">{card.sub_title}</p>
            <img
              className="card-image"
              src={card.image}
              alt={`Slide ${index}`}
            />
            <button className="card-button">SCOPRI</button>
          </div>
        ))}
      </div>
    </div>
  );
}
