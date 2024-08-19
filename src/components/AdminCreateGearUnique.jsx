/* Component Autor Andrea */
import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch.js";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useFetch } from "../custom-hooks/useFetch";

export function AdminCreateGearUnique({
  newProduct,
  setNewProduct,
  handleInputChange,
}) {
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [gearFeatures, setGearFeatures] = useState([""]);
  const [numberOfFeatures, setNumberOfFeatures] = useState(gearFeatures.length);

  const { data, error, loading, onRefresh } = useGetFetch("brands");
  const [onAddBrand, brandData, brandError] = useFetch("brands/add", "POST");

  /*Change the value of the gear select based on the type selected */
  useEffect(() => {
    setNewProduct(
      newProduct.type === "Component"
        ? { ...newProduct, gear: "GPU" }
        : { ...newProduct, gear: "Monitor" }
    );
  }, [newProduct.type]);

  useEffect(() => {
    if (data) {
      setNewProduct({ ...newProduct, brand: data[0].brand });
    }
  }, [data]);

  /* Stops the scrolling of the page when creating the new brand */
  useEffect(() => {
    if (addingBrand) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "");
  }, [addingBrand]);

  /* Adds the features to the newProduct objects and their update */
  useEffect(() => {
    setNewProduct({ ...newProduct, features: gearFeatures });
  }, [gearFeatures]);

  /* Changes the lenght of the features array */
  useEffect(() => {
    const tempFeatures = [...gearFeatures];

    if (gearFeatures.length < numberOfFeatures) {
      tempFeatures.push("");
      setGearFeatures(tempFeatures);
    }

    console.log(numberOfFeatures);
  }, [numberOfFeatures]);

  /* Handles the adding of the new brand, checking if there are already existing ones
  with the same name */
  async function handleAddBrand() {
    if (data.map((brand) => brand.brand).includes(newBrand)) {
      alert("Brand already exists");
      setNewBrand("");
      setAddingBrand(false);
    } else {
      const response = await onAddBrand({ brand: newBrand });

      if (brandError) {
        console.log(brandError);
        throw new Error("Something went wrong while adding the brand");
      }

      alert(response.msg);
      await onRefresh();
      setNewBrand("");
      setAddingBrand(false);
    }
  }

  /* Handles the changing value of each feature based on the array index */
  function handleChangeFeatures(index, value) {
    const tempFeatures = [...gearFeatures];
    tempFeatures[index] = value;
    setGearFeatures(tempFeatures);
  }

  return (
    <>
      <div className="flex flex-col selects-container">
        <div className="input-container">
          <label htmlFor="type">* Type</label>
          <select
            name="type"
            id="type"
            value={newProduct.type}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            <option value="Component">Component</option>
            <option value="Peripheral">Peripheral</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="gear">* Gear</label>
          <select
            name="gear"
            id="gear"
            value={newProduct.gear}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            {newProduct.type === "Component" && (
              <optgroup>
                <option value="GPU">GPU</option>
                <option value="SSD">SSD</option>
                <option value="CPU">CPU</option>
                <option value="RAM">RAM</option>
              </optgroup>
            )}
            {newProduct.type === "Peripheral" && (
              <optgroup>
                <option value="Monitor">Monitor</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Headset">Headset</option>
                <option value="Mouse">Mouse</option>
              </optgroup>
            )}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="brand">* Brand</label>
          <div className="flex flex-col items-end brand-container">
            {error && (
              <div className="error">
                An error has occured, couldn't retrieve the Brands List
              </div>
            )}
            {data && (
              <select
                name="brand"
                id="brand"
                value={newProduct.brand}
                onChange={(event) =>
                  handleInputChange(event.target.name, event.target.value)
                }
              >
                {data.map((brand) => (
                  <option key={brand.id} value={brand.brand}>
                    {brand.brand}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              className="flex add-brand-container"
              onClick={() => {
                setAddingBrand(true);
              }}
            >
              <div className="add-brand">Add Brand</div>
              <div className="vertical-line"></div>
              <div className="plus">+</div>
            </button>
          </div>
        </div>
      </div>
      <div className="input-container">
        <label htmlFor="series">* Series</label>
        <input
          type="text"
          id="series"
          name="series"
          value={newProduct.series}
          onChange={(event) =>
            handleInputChange(event.target.name, event.target.value)
          }
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="">* Features</label>
        <div className="flex flex-col feature-inputs">
          {gearFeatures.map((feature, index) => (
            <div key={index} className="flex justify-between single-feature">
              <input
                key={index}
                value={feature}
                onChange={(event) =>
                  handleChangeFeatures(index, event.target.value)
                }
                required
              />
              {index === 0 && (
                <button
                  type="button"
                  className="button-features"
                  onClick={() => setNumberOfFeatures(numberOfFeatures + 1)}
                >
                  <AiOutlinePlus />
                </button>
              )}
              {index !== 0 && (
                <button
                  type="button"
                  className="button-features"
                  onClick={() => {
                    setNumberOfFeatures(numberOfFeatures - 1);
                    setGearFeatures(() =>
                      [...gearFeatures].filter((el, i) => i !== index)
                    );
                  }}
                >
                  <AiOutlineMinus />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {addingBrand && (
        <div
          className="flex justify-center items-center fixed add-brand-form-container"
          onClick={(event) => setAddingBrand(false)}
        >
          <div
            className="flex flex-col add-product-container add-brand-form"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              handleAddBrand();
            }}
          >
            <label htmlFor="add-brand">Add New Brand</label>
            <input
              type="text"
              name="add-brand"
              id="add-brand"
              value={newBrand}
              onChange={(event) => setNewBrand(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  event.stopPropagation()
                  handleAddBrand(event);
                }
              }}
            />
            <div className="flex justify-between">
              <div></div>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault()
                  handleAddBrand();
                }}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
