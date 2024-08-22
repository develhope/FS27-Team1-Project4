/*Component Author Andrea */

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { imageDomain, usePostImage } from "../custom-hooks/usePostImage.js";

import { useFetch } from "../custom-hooks/useFetch";

import { Button } from "./Button.jsx";

import { RxCross2 } from "react-icons/rx";
import { AdminCreateGearUnique } from "./AdminCreateGearUnique.jsx";
import { AdminCreatePcUnique } from "./AdminCreatePcUnique.jsx";

const blankGear = {
  image: null,
  type: "Component",
  gear: "GPU",
  brand: "",
  series: "",
  originalPrice: 0,
  discount: null,
  stock: "",
  linkInfo: "",
};

const blankPc = {
  type: "PC",
  name: "",
  image: null,
  description: "",
  originalPrice: "",
  discount: null,
  stock: "",
};

export function AdminCreateProducts() {
  const { type } = useParams();
  const [newProduct, setNewProduct] = useState({});
  const [newImage, setNewImage] = useState(null);
  const inputFileRef = useRef(null)

  const [typeChecking, setTypeCheking] = useState(false)

  const [offer, setOffer] = useState(false);
  const [discount, setDiscount] = useState("");

  const [onUploadImage, imageError] = usePostImage(setNewImage);


  const [onDeleteImage, deletedImageData, deletedImageError] = useFetch(
    "upload/delete",
    "DELETE"
  );
  const [onGetGears, productsGear, productsGearError] = useFetch(
    "products/gears",
    "GET"
  );

  const [onGetPc, productsPc, productsPcError] = useFetch("products/pc", "GET");

  const [onPostNewProduct, postProductData, postProductError] = useFetch(
    "products/gears/add",
    "POST"
  );

  /* This Effect will fetch all products list */
  useEffect(() => {
    getProducts();
  }, [type]);

  /* This effect gives a little delay to let the type params be calculated
  before setting the state */

  useEffect (() => {
    setTimeout(()=> setTypeCheking(!typeChecking), 200)
  }, [])

  useEffect(() => {
    if (type === "gear") {
      setNewProduct(blankGear);
    }

    if (type === "pc") {
      setNewProduct(blankPc);
    }

    return () => {
      if (type === "gear") {
        setNewProduct(blankGear);
      }

      if (type === "pc") {
        setNewProduct(blankPc);
      }
    };
  }, [typeChecking]);

  useEffect(() => {
    if (type === "gear") {
      console.log(productsGear);
      console.log(productsGearError);
    } else {
      console.log(productsPc);
      console.log(productsPcError);
    }
  }, [productsGear, productsGearError, productsPc, productsPcError]);

  useEffect(() => {
    setNewProduct({ ...newProduct, image: newImage });
  }, [newImage]);

  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);

  useEffect(() => {
    if (!offer) {
      setDiscount("");
    }

    setNewProduct({
      ...newProduct,
      discount: discount === "" ? null : Number(discount),
    });
  }, [offer, discount]);

  useEffect(() => {
    if (newProduct.originalPrice === 0) {
      setNewProduct({ ...newProduct, originalPrice: "" });
    }
  }, [newProduct.originalPrice]);

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
      await onDeleteImage({ image: newImage });

      if (deletedImageError) {
        console.log(deletedImageError);
        throw new Error(deletedImageError);
      }

      setNewImage(null);
      inputFileRef.current.value = ""
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  function handleInputChange(name, value) {
    if (name === "originalPrice" || name === "discount") {
      value = Number(value);
    }
    if ((name === "stock") & (value !== "")) {
      value = parseInt(value, 10);
    }
    setNewProduct({ ...newProduct, [name]: value });
  }

  async function getProducts() {
    if (type === "gear") {
      await onGetGears();
    } else {
      await onGetPc();
    }
  }

  async function handleSubmitPost() {
    try {
      if (productsGear || productsPc) {
        let createdProduct = null;

        if (newProduct.discount && newProduct.originalPrice < newProduct.discount) {
          const errorMessage = "Discount can't be bigger than the Original Price"
          alert(errorMessage)
          throw new Error(errorMessage)
        }

        if (type === "gear") {
          if (
            productsGear.map((gear) => gear.series).includes(newProduct.series)
          ) {
            const errorMessage = "Series already exists";
            alert(errorMessage);
            throw new Error(errorMessage);
          }
          createdProduct = await onPostNewProduct(newProduct);
        }

        if (type === "pc") {
          if (productsPc.map((pc) => pc.name).includes(newProduct.name)) {
            const errorMessage = "Name already exists";
            alert(errorMessage);
            throw new Error(errorMessage);
          }
          createdProduct = await onPostNewProduct(
            newProduct,
            "products/pc/add"
          );
        }

        if (postProductError) {
          throw new Error(JSON.stringify(createdProduct));
        }

        console.log(createdProduct);

        alert(JSON.stringify(createdProduct.msg));
      }
    } catch (error) {
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
            {newProduct.image && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleImageDeleting();
                }}
              >
                <RxCross2 />
              </button>
            )}
          </div>
          {newProduct.image && (
            <div className="flex justify-center aligne-center image-container">
              <img
                src={imageDomain + newProduct.image}
                alt="image upload preview"
              />
            </div>
          )}
          <input
            type="file"
            name="image"
            id="image"
            className="input-file"
            ref={inputFileRef}
            onChange={(event) => handleImageUploading(event.target.files[0])}
          />
        </div>

        {type === "gear" && (
          <AdminCreateGearUnique
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleInputChange={handleInputChange}
          />
        )}

        {type === "pc" && (
          <AdminCreatePcUnique
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleInputChange={handleInputChange}
          />
        )}

        <div className="flex flex-col create-price-container">
          <div className="input-container">
            <label htmlFor="originalPrice">* Original Price</label>
            <input
              type="number"
              step={0.01}
              name="originalPrice"
              id="originalPrice"
              value={newProduct.originalPrice || ""}
              onChange={(event) =>
                handleInputChange(event.target.name, event.target.value)
              }
              placeholder="00.00"
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
                value={discount || ""}
                onChange={(event) =>
                  setDiscount(
                    event.target.value === "" ? "" : event.target.value
                  )
                }
                disabled={!offer}
                placeholder={!offer ? "No Discount" : "00.00"}
                className={!offer ? "disabled" : ""}
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
            value={newProduct.stock || ""}
            placeholder="0"
            step="1"
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
    </div>
  );
}
