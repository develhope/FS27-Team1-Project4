import React, { useState, useEffect } from "react";
import ProductCardComputer from "./ProductCardComputer";
import ProductDetailsComputer from "./ProductDetailsComputer";  
import { useGetFetch } from "../custom-hooks/useGetFetch";

const ProductListComputer = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const {data , error , loading}= useGetFetch("products/pc");

  useEffect(() => {
    console.log("Data from Computer:", data);
    console.log("Error from Computer:", error);
  }, [data, error]);

  let categories = [];
  let filteredProducts = [];

  if (data) {
    categories = ["all", ...Array.from(new Set(data.map((product) => product.type)))];
    filteredProducts = selectedCategory === "all"
      ? data
      : data.filter((product) => product.type === selectedCategory);
  }

  const itemsPerPage = 6;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
    setSelectedProduct(null); // Resetta il prodotto selezionato quando cambia categoria
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="product-page">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      {data && !error && (
        <>
          {selectedProduct ? (
            <ProductDetailsComputer
              product={selectedProduct}
              onBack={handleBackToList}
            />
          ) : (
            <>
              <div className="filter">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="product-list">
                {currentProducts.map((product) => (
                  <div key={product.id} onClick={() => handleProductClick(product)}>
                    <ProductCardComputer
                      id={product.id}
                      type={product.type}
                      name={product.name}
                      image={product.image}
                      description={product.description}
                      originalPrice={product.originalPrice} 
                      discount={product.discount} 
                    />
                  </div>
                ))}
              </div>
              
              <div className="pagination">
                <button
                  className="arrow"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`page-number ${currentPage === index + 1 ? "current-page" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="arrow"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListComputer;
