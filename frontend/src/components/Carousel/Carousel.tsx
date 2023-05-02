import React, { useState } from "react";

import "./carousel.css";

interface CarouselProps {
  imagesLinks: string[];
}

export const Carousel = ({ imagesLinks }: CarouselProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) =>
      prev === imagesLinks.length - 1 ? prev : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setSlideIndex(index);
  };

  if (imagesLinks.length === 0) {
    return <h1>There are no images</h1>;
  }

  return (
    <div className="slider-box">
      <button
        disabled={slideIndex === 0}
        className={`prev arrow-button control-prev ${
          slideIndex === 0 ? "arrow-button-disabled" : ""
        }`}
        onClick={handlePrevSlide}
      >
        &#10094;
      </button>
      <div className="slider">
        <div
          className="slides"
          style={{
            transform: `translateX(-${slideIndex * 400}px)`,
            width: `${imagesLinks.length * 100}%`,
          }}
        >
          {imagesLinks.length &&
            imagesLinks.map((link) => (
              <div key={link} className="slide">
                <img
                  src={`${process.env.REACT_APP_API_URL}/images/${link}`}
                  alt={link.split(".")[0].split("_")[1] || link}
                />
              </div>
            ))}
        </div>

        <div className="controls"></div>
      </div>
      <button
        disabled={slideIndex === imagesLinks.length - 1}
        className={`next arrow-button control-prev ${
          slideIndex === imagesLinks.length - 1 ? "arrow-button-disabled" : ""
        }`}
        onClick={handleNextSlide}
      >
        &#10095;
      </button>
      <div className="dots-container">
        {imagesLinks.length &&
          imagesLinks.map((link, index) => (
            <button
              disabled={slideIndex === index}
              key={link + index}
              className={`dot ${slideIndex === index ? "dot-disabled" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
      </div>
    </div>
  );
};
