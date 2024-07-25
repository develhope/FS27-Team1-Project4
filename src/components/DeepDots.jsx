/* Component Author Andrea */

export function DeepDots({
  dotsNumber = 3,
  dotsRows = 3,
  dotsColumns = 1,
  dotsOpacity = 0.7,
}) {

  const gridTemplate = {
    display: "grid",
    gridTemplateRows : `repeat(${dotsRows}, 1fr)`,
    gridTemplateColumns : `repeat(${dotsColumns}, 1fr)`
  }

  const opacity = {
    opacity: `${dotsOpacity}`
  }
  return (
    <div style={gridTemplate}>
      {Array.from({ length: dotsNumber }, (_, index) => (
        <div key={index} style={opacity} className="single-dot"></div>
      ))}
    </div>
  );
}
