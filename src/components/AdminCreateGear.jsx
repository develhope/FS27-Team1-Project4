/*Component Author Andrea */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imageDomain, usePostImage } from "../custom-hooks/usePostImage.js";

import { useGetFetch } from "../custom-hooks/useGetFetch.js";
import { useFetch } from "../custom-hooks/useFetch";

import { Button } from "./Button.jsx";

import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const blankGear = {
  image: null,
  type: "Component",
  gear: "GPU",
  brand: "",
  series: "",
  originalPrice: 0,
  discount: null,
  stock: 0,
  linkInfo: "",
};

const blankPc = {
  type: "PC",
  name: "",
  image: null,
  description: "",
  originalPrice: 0,
  discount: null,
  stock: 0,
};

export function AdminCreateGear() {
  const { type } = useParams();
  const [newGear, setNewGear] = useState(blankGear);
  const [newImage, setNewImage] = useState(null);
  const [gearFeatures, setGearFeatures] = useState([""]);
  const [numberOfFeatures, setNumberOfFeatures] = useState(gearFeatures.length);
  const [addingBrand, setAddingBrand] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [offer, setOffer] = useState(false);
  const [discount, setDiscount] = useState("");

  const [onUploadImage, imageError] = usePostImage(setNewImage);
  const { data, error, loading, onRefresh } = useGetFetch("brands");
  const [onAddBrand, brandData, brandError] = useFetch("brands/add", "POST");
  const [onDeleteImage, deletedImageData, deletedImageError] = useFetch(
    "upload/delete",
    "DELETE"
  );
  const [onGetProducts, productsData, productsError] = useFetch(
    "products/gears",
    "GET"
  );
  const [onPostNewProduct, postProductData, postProductError] = useFetch(
    "products/gears/add",
    "POST"
  );
  const [newPc, setNewPc] = useState(blankPc);

  /* This Effect will fetch all products list */
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(productsData);
    console.log(productsError);
  }, [productsData, productsError]);

  useEffect(() => {
    setNewGear({ ...newGear, image: newImage });
    setNewPc({ ...newPc, image: newImage });
  }, [newImage]);

  useEffect(() => {
    setNewGear(
      newGear.type === "Component"
        ? { ...newGear, gear: "GPU" }
        : { ...newGear, gear: "Monitor" }
    );
  }, [newGear.type]);

  useEffect(() => {
    if (data) {
      setNewGear({ ...newGear, brand: data[0].brand });
    }
  }, [data]);

  useEffect(() => {
    if (addingBrand) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "");
  }, [addingBrand]);

  useEffect(() => {
    console.log({ ...newGear, features: gearFeatures });
    console.log(newPc);
  }, [newGear, gearFeatures]);

  useEffect(() => {
    const tempFeatures = [...gearFeatures];

    if (gearFeatures.length < numberOfFeatures) {
      tempFeatures.push("");
      setGearFeatures(tempFeatures);
    }

    console.log(numberOfFeatures);
  }, [numberOfFeatures]);

  useEffect(() => {
    if (offer) {
      setDiscount(0);
    }

    if (!offer) {
      setDiscount("");
    }

    if (discount === "") {
      setNewGear({ ...newGear, discount: null });
      setNewPc({ ...newPc, discount: null });
    } else {
      setNewGear({ ...newGear, discount });
      setNewPc({ ...newPc, discount });
    }
  }, [offer, discount]);

  async function handleImageUploading(image) {
    try {
      await onUploadImage(image);

      if (imageError) {
        console.log(imageError);
        throw new Error(imageError);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function handleImageDeleting() {
    try {
      await onDeleteImage({ image: gearImage });

      if (deletedImageError) {
        console.log(deletedImageError);
        throw new Error(deletedImageError);
      }

      setGearImage(null);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  function handleInputChange(name, value) {
    if (type === "gear") {
    setNewGear({ ...newGear, [name]: value });
    } else {
    setNewPc({...newPc, [name]: value})
    }
  }

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

  function handleChangeFeatures(index, value) {
    const tempFeatures = [...gearFeatures];
    tempFeatures[index] = value;
    setGearFeatures(tempFeatures);
  }

  async function getProducts() {
    if (type === "gear") {
      await onGetProducts();
    } else {
      await onGetProducts(null, "products/pc");
    }
  }

  async function handleSubmitPost() {
    try {
      if (productsData) {
        if (productsData.map((gear) => gear.series).includes(newGear.series)) {
          const errorMessage = "Series already exists";
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        let createdProduct = null;

        if (type === "gear") {
          createdProduct = await onPostNewProduct({
            ...newGear,
            features: gearFeatures,
          });
        } else {
          createdProduct = await onPostNewProduct(
            { ...newGear, features: gearFeatures },
            "products/pc/add"
          );
        }

        if (postProductError) {
          throw new Error(postProductError.msg);
        }

        console.log(createdProduct);

        alert(createdProduct.msg);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-col items-center create-products">
      <h1>Add {type}</h1>
      <form
        className="flex flex-col add-product-container"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitPost();
        }}
      >
        <div className="input-container">
          <div className="flex justify-between items-center upload-image-button">
            <label htmlFor="image"> Image </label>
            {newGear.image && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleImageDeleting();
                }}
              >
                <RxCross2 />
              </button>
            )}
          </div>
          {newGear.image && (
            <div className="flex justify-center aligne-center image-container">
              <img
                src={imageDomain + newGear.image}
                alt="image upload preview"
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            id="image"
            className="input-file"
            onChange={(event) => handleImageUploading(event.target.files[0])}
          />
        </div>

        {type === "gear" && (
          <>
            <div className="flex flex-col selects-container">
              <div className="input-container">
                <label htmlFor="type">* Type</label>
                <select
                  name="type"
                  id="type"
                  value={newGear.type}
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
                  value={newGear.gear}
                  onChange={(event) =>
                    handleInputChange(event.target.name, event.target.value)
                  }
                >
                  {newGear.type === "Component" && (
                    <optgroup>
                      <option value="GPU">GPU</option>
                      <option value="SSD">SSD</option>
                      <option value="CPU">CPU</option>
                      <option value="RAM">RAM</option>
                    </optgroup>
                  )}
                  {newGear.type === "Peripheral" && (
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
                      value={newGear.brand}
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
                value={newGear.series}
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
                  <div
                    key={index}
                    className="flex justify-between single-feature"
                  >
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
                        onClick={() =>
                          setNumberOfFeatures(numberOfFeatures + 1)
                        }
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
          </>
        )}

        <div className="flex flex-col create-price-container">
          <div className="input-container">
            <label htmlFor="originalPrice">* Original Price</label>
            <input
              type="number"
              step={0.01}
              name="originalPrice"
              id="original-price"
              value={newGear.originalPrice}
              onChange={(event) =>
                handleInputChange(event.target.name, Number(event.target.value))
              }
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="discount"> Discount </label>
            <div className="flex items-center justify-between create-discount-container">
              <input
                type="checkbox"
                className="checkbox"
                checked={offer}
                onChange={() => setOffer(!offer)}
              />
              <input
                type="number"
                step={0.01}
                name="discount"
                id="discount"
                value={discount}
                onChange={(event) => setDiscount(Number(event.target.value))}
                disabled={!offer}
                placeholder="disabled"
              />
            </div>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="stock">* Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="admin-create-stock"
            value={newGear.stock}
            onChange={(event) =>
              handleInputChange(event.target.name, Number(event.target.value))
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="linkInfo">Link Info</label>
          <input
            type="text"
            id="link-info"
            name="linkInfo"
            value={newGear.linkInfo}
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="flex justify-between admin-create-button-container">
          <div></div>
          <Button text={type === "gear" ? "Add Gear" : "Add Pc"} />
        </div>
      </form>
      {addingBrand && (
        <div
          className="flex justify-center items-center fixed add-brand-form-container"
          onClick={(event) => setAddingBrand(false)}
        >
          <form
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
            />
            <div className="flex justify-between">
              <div></div>
              <button>
                <AiOutlinePlus />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
