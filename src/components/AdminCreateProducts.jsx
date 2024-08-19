/*Component Author Andrea */

import { useEffect, useState } from "react";
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

  const [offer, setOffer] = useState(false);
  const [discount, setDiscount] = useState("");

  const [onUploadImage, imageError] = usePostImage(setNewImage);

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

  /* This Effect will fetch all products list */
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (type === "gear") {
      setNewProduct(blankGear);
    }

    if (type === "pc") {
      setNewProduct(blankPc);
    }
  }, [type]);

  useEffect(() => {
    console.log(productsData);
    console.log(productsError);
  }, [productsData, productsError]);

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
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  function handleInputChange(name, value) {
    if (name === "originalPrice" || name === "discount") {
      value = Number(value);
    }
    if (name === "stock" & value !== "") {
      value = parseInt(value, 10);
    }
    setNewProduct({ ...newProduct, [name]: value });
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
        if (type === "gear") {
          if (
            productsData.map((gear) => gear.series).includes(newProduct.series)
          ) {
            const errorMessage = "Series already exists";
            alert(errorMessage);
            throw new Error(errorMessage);
          }
        }

        if (type === "pc") {
          if (productsData.map((pc) => pc.name).includes(newProduct.name)) {
            const errorMessage = "Name already exists";
            alert(errorMessage);
            throw new Error(errorMessage);
          }
        }

        let createdProduct = null;

        if (type === "gear") {
          createdProduct = await onPostNewProduct(newProduct);

          if (type === "pc") {
            createdProduct = await onPostNewProduct(
              newProduct,
              "products/pc/add"
            );
          }

          if (postProductError) {
            throw new Error(postProductError.msg);
          }

          console.log(createdProduct);

          alert(createdProduct.msg);
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
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
              id="original-price"
              value={newProduct.originalPrice}
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
                value={discount}
                onChange={(event) =>
                  setDiscount(
                    event.target.value === "" ? "" : event.target.value
                  )
                }
                disabled={!offer}
                placeholder={!offer ? "disabled" : "00.00"}
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
            value={newProduct.stock}
            placeholder="0"
            step="1"
            onChange={(event) =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="linkInfo">Link Info</label>
          <input
            type="text"
            id="link-info"
            name="linkInfo"
            value={newProduct.linkInfo}
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
