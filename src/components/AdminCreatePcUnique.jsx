/* Component Autor Andrea */

export function AdminCreatePcUnique({
  newProduct,
  setNewProduct,
  handleInputChange,
}) {
  return (
    <>
      <div className="input-container">
        <label htmlFor="name">* Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newProduct.name || ""}
          onChange={(event) =>
            handleInputChange(event.target.name, event.target.value)
          }
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="description">* Description</label>
        <textarea
          name="description"
          id="description"
          value={newProduct.description || ""}
          onChange={(event) =>
            handleInputChange(event.target.name, event.target.value)
          }
          required
        ></textarea>
      </div>
    </>
  );
}
