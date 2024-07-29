const images = [
  "/src/assets/andrea-hacker.png",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/domy-hacker.png",
];

export function CarouselGear() {
  return (
    <div className="gear-slide">
      <div className="gear-slide-images">
        {images.concat(images).map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} />
        ))}
      </div>
    </div>
  );
}
