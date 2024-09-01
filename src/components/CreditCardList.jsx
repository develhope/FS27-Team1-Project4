export function CreditCardList({ chosenCC, onChange, cc }) {
  return (
    <>
      {cc.map((card, index) => (
        <div key={index} className="flex justify-between items-center cc">
          <h3>XXXX-XXXX-XXXX-{card}</h3>
          <input
            type="checkbox"
            name="default-card"
            id="default-card"
            checked={chosenCC === index}
            onChange={() => onChange(index)}
          />
        </div>
      ))}
    </>
  );
}
