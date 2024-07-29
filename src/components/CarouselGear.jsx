const images = [
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
  "/src/assets/h.webp",
];

export function CarouselGear() {
  return (
    <div className="gear-slide">
      <div className="gear-slide-images">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} />
        ))}
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} />
        ))}
      </div>
    </div>
  );
}
