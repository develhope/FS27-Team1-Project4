import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

export function CarouselOffer() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/products/gears"
        );
        const data = await response.json();
        
        // Filtra i prodotti per includere solo quelli con un valore di discount diverso da null
        const filteredProducts = data.filter(product => product.discount !== null);
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - translateX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const cardWidth =
      window.innerWidth <= 380
        ? containerRef.current.offsetWidth
        : window.innerWidth > 380 && window.innerWidth <= 768
        ? containerRef.current.offsetWidth / 2
        : window.innerWidth > 768 && window.innerWidth <= 1280
        ? containerRef.current.offsetWidth / 3
        : containerRef.current.offsetWidth / 4;
    const newIndex = Math.round(-translateX / cardWidth);
    setCurrentIndex(newIndex);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    setTranslateX(x);
  };

  useEffect(() => {
    if (products.length === 0) return; // Ensure there are products before proceeding

    const cardWidth =
      window.innerWidth <= 380
        ? containerRef.current.offsetWidth
        : window.innerWidth > 380 && window.innerWidth <= 768
        ? containerRef.current.offsetWidth / 2
        : window.innerWidth > 768 && window.innerWidth <= 1280
        ? containerRef.current.offsetWidth / 3
        : containerRef.current.offsetWidth / 4;
    const newTranslateX = -currentIndex * cardWidth;
    setTranslateX(newTranslateX);

    if (currentIndex === 8 + products.length || currentIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(8);
      }, 300);
    }
    if (currentIndex > 8 + products.length - 1 || currentIndex <= 1) {
      setNoTransition(true);
    } else if (currentIndex === 9 || currentIndex === 7) {
      setNoTransition(false);
    }
  }, [currentIndex, products.length]);

  return (
    <div className="carousel">
      <button className="arrow left-arrow" onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <div
        className="card-container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="card-wrapper"
          style={{
            transform: `translateX(${translateX}px)`,
            transition:
              isDragging || (currentIndex === 8 && noTransition)
                ? "none"
                : "transform 0.3s ease-out",
          }}
        >
          {products
            .concat(products.slice(0, 8))
            .concat(products.slice(0, 8))
            .map((product, index) => (
              <div key={`${product.id}-${index}`} className="card">
                <div className="card-background"></div>
                <div className="card-inner">
                  <div
                    className="card-front"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: [7, 8, 9].includes(product.id) ? "auto 180px" : "90%",
                      display: "block",
                    }}
                  >
                    <h2 className="card-title">{product.series}</h2>
                    <div className="button-price-container">
                      <div className="price-info">
                        <span className="original-price">
                          €{product.originalPrice}
                        </span>
                        <span className="discount-price">
                          €{product.discount}
                        </span>
                      </div>
                      <Button text="Buy Now" />
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="back-content">
                      <h2 className="card-title">{product.series}</h2>

                      <p className="card-features">
                        {product.features.join(", ")}
                      </p>
                      <div className="button-price-container">
                        <div className="price-info">
                          <span className="original-price">
                            €{product.originalPrice}
                          </span>

                          <span className="discount-price">
                            €{product.discount}
                          </span>
                        </div>
                        <Button text="Buy Now" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className="arrow right-arrow" onClick={handleNext}>
        <FaChevronRight />{" "}
      </button>
    </div>
  );
}