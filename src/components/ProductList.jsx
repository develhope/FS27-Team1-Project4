/*Component author Massimo*/
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import { useGetFetch } from "../custom-hooks/useGetFetch";


const ProductList = () => {
    const { data, error, loading } = useGetFetch("products/gears");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemsPerPage = 6;

    const products = data || [];
    const categories = ["all", ...Array.from(new Set(products.map((product) => product.gear)))];

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter((product) => product.gear === selectedCategory);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-page">
            {selectedProduct ? (
                <ProductDetails product={selectedProduct} onBack={handleCloseDetail} />
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
                            <ProductCard
                                key={product.id}
                                name={product.gear}
                                description={product.features.join(", ")}
                                originalPrice={product.originalPrice}
                                discount={product.discount}
                                imageUrl={product.image}
                                onClick={() => handleProductClick(product)}
                                id={product.id}
                            />
                        ))}
                    </div>
                    <div className="pagination">
                        <button
                            className="pagination-button"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className="pagination-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
