/* Component Author Andrea */

import { useEffect, useState } from "react";
import { useGetFetch } from "../custom-hooks/useGetFetch";
import { AdminProductsFilter } from "./AdminProductsFilters";
import { useNavigate } from "react-router-dom";

import { BsFilterLeft } from "react-icons/bs";

export function AdminProductsList() {
  const [products, setProducts] = useState(null);

  const [filterType, setFilterType] = useState("");
  const [filterGear, setFilterGear] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const [typesArray, setTypesArray] = useState([]);
  const [gearsArray, setGearsArray] = useState([]);
  const [brandsArray, setBrandsArray] = useState([]);

  const navigate = useNavigate();

  const gearsList = useGetFetch("products/gears");
  const pcList = useGetFetch("products/pc");
  const brandList = useGetFetch("brands");

  /* This effect combines all the products in a single array */
  useEffect(() => {
    if (gearsList.data && pcList.data) {
      setProducts([...gearsList.data, ...pcList.data]);
    }
  }, [gearsList.data, pcList.data]);

  /* Log for Testing */
  useEffect(() => {
    if (products) {
      setGearsArray(generateFilterArray("gear"));
      setTypesArray(generateFilterArray("type"));
    }

    console.log(products);
  }, [products]);

  useEffect(() => {
    if (brandList.data) {
      setBrandsArray(brandList.data.map((brand) => brand.brand));
    }
  }, [brandList.data]);

  function generateFilterArray(category) {
    const tempArray = [];

    if (products.find((prod) => prod[category])) {
      const filteredArray = products
        .filter((prod) => prod[category])
        .map((prod) => prod[category]);

      filteredArray.forEach((prod) => {
        if (!tempArray.includes(prod)) {
          tempArray.push(prod);
        }
      });
    }

    return tempArray;
  }

  function filteredProducts(type, gear, brand) {
    if (products) {
      let filteredProducts = [...products];

      if (type !== "") {
        filteredProducts = filteredProducts.filter(
          (product) => product.type === type
        );
      }

      if (gear !== "") {
        filteredProducts = filteredProducts.filter(
          (product) => product.gear === gear
        );
      }

      if (brand !== "") {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === brand
        );
      }

      return filteredProducts;
    }
  }

  return (
    <div className="flex flex-col items-center relative admin-products-list">
      <h1>Products</h1>
      <div className="flex flex-col admin-products-list-container">
        <div className="flex justify-between items-center product-list-filters">
          <div className="flex justify-center items-center filter-icon-container">
            <BsFilterLeft />
          </div>
          <div className="flex flex-col filter-container">
            <AdminProductsFilter
              name={"type"}
              filter={filterType}
              setFilter={setFilterType}
              type={typesArray}
            />
            <AdminProductsFilter
              name={"gear"}
              filter={filterGear}
              setFilter={setFilterGear}
              type={gearsArray}
            />
            <AdminProductsFilter
              name={"brand"}
              filter={filterBrand}
              setFilter={setFilterBrand}
              type={brandsArray}
            />
          </div>
        </div>
        <div className="flex flex-col products-container">
          {(gearsList.loading || pcList.loading) && <h1>Loading...</h1>}
          {(gearsList.error || pcList.error) && (
            <h1>
              {gearsList.error
                ? gearsList.error
                : pcList.error
                ? pcList.error
                : "Something went wrong, couldn't retrieve the products"}
            </h1>
          )}
          {products &&
            filteredProducts(filterType, filterGear, filterBrand).length > 0 &&
            filteredProducts(filterType, filterGear, filterBrand).map(
              (product, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center admin-product"
                  onClick={() =>
                    navigate(
                      product.series
                        ? `/admin/product/gear/${product.id}`
                        : `/admin/product/pc/${product.id}`
                    )
                  }
                >
                  {product.series && (
                    <>
                      <div className="flex items-center product-header">
                        <div className="flex justify-center items-center product-image-container">
                          {product.image && (
                            <img
                              src={"http://localhost:3000" + product.image}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="name">
                          <h3>{product.series}</h3>
                        </div>
                      </div>
                      <div className="flex justify-between admin-product-info">
                        <div className="hidden type-product">
                          <p>{product.type}</p>
                        </div>
                        <div className="gear-product">
                          <p>{product.gear}</p>
                        </div>
                        <div className="brand-product">
                          <p>{product.brand}</p>
                        </div>
                        <div className="hidden price-product">
                          <p>{product.originalPrice}</p>
                          <p className="product-discount">{product.discount}</p>
                        </div>
                        <div className="stock-product">
                          <p
                            className={`${
                              product.stock <= 10 ? "alert-stock" : ""
                            }`}
                          >
                            {product.stock}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {product.name && (
                    <>
                      <div className="flex items-center product-header">
                        <div className="flex justify-center items-center product-image-container">
                          {product.image && (
                            <img
                              src={"http://localhost:3000" + product.image}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="name">
                          <h3>{product.name}</h3>
                        </div>
                      </div>
                      <div className="flex justify-between admin-product-info">
                        <div className="type-product">
                          <p>{product.type}</p>
                        </div>
                        <div className="hidden gear-product">
                          <p></p>
                        </div>
                        <div className="brand-product">
                          <p></p>
                        </div>
                        <div className="hidden price-product">
                          <p>{product.originalPrice} $</p>
                          <p className="product-discount">
                            {product.discount && product.discount + " $"}
                          </p>
                        </div>
                        <div className="stock-product">
                          <p
                            className={`${
                              product.stock <= 10 ? "alert-stock" : ""
                            }`}
                          >
                            {product.stock}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          {products &&
            filteredProducts(filterType, filterGear, filterBrand).length ===
              0 && (
              <div className="flex justify-center items-center filter-warning">
                <h2>No product matches the filters</h2>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
