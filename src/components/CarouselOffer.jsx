import { useState, useRef, useEffect } from "react";

const cards = [
  {
    id: 1,
    backgroundImage: "url(/public/rtx4090.png)",
    backgroundSize: "90%",
    title: "VIPERA NVIDIA Geforce RTX 4090",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$1999.99",
    discountPrice: "$1799.99",
    saveAmount: "$200",
  },
  {
    id: 2,
    backgroundImage: "url(/public/samsung-viewfinity.png)",
    backgroundSize: "100%",
    title: "SAMSUNG HRM VIEW-FINITY S6",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$380.99",
    discountPrice: "$341.99",
    saveAmount: "$39.00",
  },
  {
    id: 3,
    backgroundImage: "url(/public/corsair-k70.png)",
    backgroundSize: "80%",
    title: "CORSAIR K-70",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$229.99",
    discountPrice: "$189.99",
    saveAmount: "$40",
  },
  {
    id: 4,
    backgroundImage: "url(/public/lexar-2tb.png)",
    backgroundSize: "90%",
    title: "LEXAR NM789 2TB",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$164.99",
    discountPrice: "$129.99",
    saveAmount: "$35",
  },
  {
    id: 5,
    backgroundImage: "url(/public/intel-core-i7.png)",
    backgroundSize: "50%",
    title: "INTEL CORE I7",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$265.99",
    discountPrice: "$215.99",
    saveAmount: "$50",
  },
  {
    id: 6,
    backgroundImage: "url(/public/corsair-hs65.png)",
    backgroundSize: "50%",
    title: "CORSAIR HS65",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$89.99",
    discountPrice: "£69.99",
    saveAmount: "£20",
  },
  {
    id: 7,
    backgroundImage: "url(/public/logitech-g502.png)",
    backgroundSize: "30%",
    title: "LOGITECH G502",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$169.99",
    discountPrice: "$99.99",
    saveAmount: "$70",
  },
  {
    id: 8,
    backgroundImage: "url(/public/ram-vengeance.png)",
    backgroundSize: "contain",
    title: "RAM VENGEANCE 64GB (2X32GB)",
    features: [
      "Founder Edition",
      "16,384 core NVIDIA CUDA",
      "Supporta HDR 4K 120Hz, HDR 8K 60Hz e Frequenza di aggiornamento variabile come specificato in HDMI 2.1a",
      "Nuovi multiprocessori di streaming: prestazioni fino a 2x ed efficienza energetica",
    ],
    price: "$214.99",
    discountPrice: "$194.99",
    saveAmount: "$20",
  },
];

export function CarouselOffer() {
  const [currentIndex, setCurrentIndex] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef(null);
  const [noTransition, setNoTransition] = useState(false);

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
    const cardWidth = containerRef.current.offsetWidth / 4;
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
    const cardWidth = containerRef.current.offsetWidth / 4;
    const newTranslateX = -currentIndex * cardWidth;
    setTranslateX(newTranslateX);

    if (currentIndex === 8 + cards.length || currentIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(8);
      }, 300);
    }
    if(currentIndex > 8 + cards.length - 1 || currentIndex <= 1) {
      setNoTransition(true)
    }else if (currentIndex === 9 || currentIndex === 7){
      setNoTransition(false)
    }
    console.log(noTransition);
  }, [currentIndex]);



  return (
    <div className="carousel">
      <button className="arrow left-arrow" onClick={handlePrev}>
        &lt;
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
          {cards
            .concat(cards.slice(0, 8))
            .concat(cards.slice(0, 8))
            .map((card, index) => (
              <div key={`${card.id}-${index}`} className="card">
                <div className="card-background"></div>
                <div className="card-inner">
                  <div
                    className="card-front"
                    style={{
                      backgroundImage: card.backgroundImage,
                      backgroundSize: card.backgroundSize,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <h2 className="card-title">{card.title}</h2>
                    <div className="price-info">
                      <span className="original-price">{card.price}</span>
                      <span className="save-price">
                        Buy and Save {card.saveAmount}
                      </span>
                      <span className="discount-price">
                        {" "}
                        {card.discountPrice}
                      </span>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="back-content">
                      <h2 className="card-title">{card.title}</h2>
                      <ul>
                        {card.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <div className="price-info">
                        <span className="original-price">{card.price}</span>
                        <span className="save-price">
                          Buy and Save {card.saveAmount}
                        </span>
                        <span className="discount-price">
                          {card.discountPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className="arrow right-arrow" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
}
