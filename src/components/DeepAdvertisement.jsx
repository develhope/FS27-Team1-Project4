/* Component Author Andrea */

export function DeepAdvertisement({ item }) {
  return (
    <div className="flex justify-between items-center deep-item">
      <img src={"http://localhost:3000" + item.image} alt="Product" />
      <div className="flex flex-col items-center justify-between deep-item-info">
        <h3>{item.series}</h3>
        <h4>{Number(item.discount).toFixed(2)}</h4>
      </div>
    </div>
  );
}
