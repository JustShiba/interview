import React, { useState } from "react";

import { Image } from "../../interfaces";

import "./carousel.css";

interface CarouselProps {
  images: Image[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev === images.length - 1 ? prev : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setSlideIndex(index);
  };

  if (images.length === 0) {
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
            width: `${images.length * 100}%`,
          }}
        >
          {images.length &&
            images.map((image) => (
              <div key={`${image.id}${image.albumId}`} className="slide">
                <img src={image.url || image.path} alt="card-img" />
              </div>
            ))}
        </div>

        <div className="controls"></div>
      </div>
      <button
        disabled={slideIndex === images.length - 1}
        className={`next arrow-button control-prev ${
          slideIndex === images.length - 1 ? "arrow-button-disabled" : ""
        }`}
        onClick={handleNextSlide}
      >
        &#10095;
      </button>
      <div className="dots-container">
        {images.length &&
          images.map((image, index) => (
            <button
              disabled={slideIndex === index}
              key={`${image.albumId}${image.id}`}
              className={`dot ${slideIndex === index ? "dot-disabled" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
      </div>
    </div>
  );
};
