import { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

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
    saveAmount: "$200.00",
  },
  {
    id: 2,
    backgroundImage: "url(/public/samsung-viewfinity.png)",
    backgroundSize: "100%",
    title: "SAMSUNG HRM VIEW-FINITY S6",
    features: [
      "ViewFinity S6 S65VC",
      "(LS34C652VAUXEN) – 34″ Ultra-",
      "WQHD Curved 1000R, VA LED,",
      "5ms, 100Hz",
    ],
    price: "$590.99",
    discountPrice: "$539.99",
    saveAmount: "$51.00",
  },
  {
    id: 3,
    backgroundImage: "url(/public/corsair-k70.png)",
    backgroundSize: "80%",
    title: "CORSAIR K-70",
    features: [
      "Tastiera gaming meccanica K70 RGB PRO con keycap in policarbonato — CHERRY MX Red (IT)",
      "con un resistente telaio in alluminio, switch meccanici CHERRY MX e retroilluminazione RGB.",
      "Allo stesso tempo stabilisce un nuovo record di prestazioni grazie alla tecnologia AXON",
    ],
    price: "$229.99",
    discountPrice: "$189.99",
    saveAmount: "$40.00",
  },
  {
    id: 4,
    backgroundImage: "url(/public/lexar-2tb.png)",
    backgroundSize: "90%",
    title: "LEXAR NM789 2TB",
    features: [
      "Lexar NM790 SSD Interno 2TB, M.2 2280 PCIe Gen4x4",
      "NVMe SSD, Fino a 7400MB/s in Lettura, 6500MB/s in Scrittura",
      "Disco a Stato Solido per PS5, PC, laptop e giocatori (LNM790X002T-RNNNG)",
    ],
    price: "$164.99",
    discountPrice: "$129.99",
    saveAmount: "$35.00",
  },
  {
    id: 5,
    backgroundImage: "url(/public/intel-core-i7.png)",
    backgroundSize: "50%",
    title: "INTEL CORE I7",
    features: [
      "Intel® Core™ i7-12700KF, processore desktop",
      "per sistemi desktop 12 (8P+4E) core fino a 5,0 GHz",
      "sbloccato LGA1700 serie 600 chipset 125 W",
    ],
    price: "$265.99",
    discountPrice: "$215.99",
    saveAmount: "$50.00",
  },
  {
    id: 6,
    backgroundImage: "url(/public/corsair-hs65.png)",
    backgroundSize: "50%",
    title: "CORSAIR HS65",
    features: [
      "Audio: Dolby Surround 7.1",
      "Connettività: Via cavo",
      "Interfaccia: USB, analogica da 3,5 mm",
      "Compatibilità: PC, Mac, PlayStation, Xbox, dispositivo mobile",
    ],
    price: "$89.99",
    discountPrice: "£69.99",
    saveAmount: "£20.00",
  },
  {
    id: 7,
    backgroundImage: "url(/public/logitech-g502.png)",
    backgroundSize: "30%",
    title: "LOGITECH G502",
    features: [
      "Design iconico G502 e wireless LIGHTSPEED per una connettività ultraveloce e affidabile.",
      "sensore HERO 25K offre tracciamento submicrometrico",
      "Compatibile con POWERPLAY per il caricamento continuo, a riposo o durante il gioco.",
    ],
    price: "$169.99",
    discountPrice: "$99.99",
    saveAmount: "$70.00",
  },
  {
    id: 8,
    backgroundImage: "url(/public/ram-vengeance.png)",
    backgroundSize: "contain",
    title: "RAM VENGEANCE 64GB (2X32GB)",
    features: [
      "Kit di memoria VENGEANCE® 64 GB (2x32 GB) DDR5 DRAM 6.000 MT/s CL38 — Nero CORSAIR VENGEANCE DDR5, ",
      "ottimizzato per schede madri Intel®,",
      "offre frequenze più elevate e maggiori capacità della tecnologia DDR5 in un modulo compatto e di alta qualità adatto al tuo sistema.",
    ],
    price: "$214.99",
    discountPrice: "$194.99",
    saveAmount: "$20.00",
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

    if (currentIndex === 8 + cards.length || currentIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(8);
      }, 300);
    }
    if (currentIndex > 8 + cards.length - 1 || currentIndex <= 1) {
      setNoTransition(true);
    } else if (currentIndex === 9 || currentIndex === 7) {
      setNoTransition(false);
    }
    console.log(noTransition);
  }, [currentIndex]);

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
                    <div className="button-price-container">
                      <div className="price-info">
                        <span className="original-price">{card.price}</span>
                        <span className="discount-price">
                          {card.discountPrice}
                        </span>
                      </div>
                      <Button text="Buy Now" />
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="back-content">
                      <h2 className="card-title">{card.title}</h2>
                      <p className="card-features">{card.features}</p>
                      <div className="button-price-container">
                        <div className="price-info">
                          <span className="original-price">{card.price}</span>
                          <span className="discount-price">
                            {card.discountPrice}
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
        <FaChevronRight />
      </button>
    </div>
  );
}
