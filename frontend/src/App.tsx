import React, { useEffect, useState } from "react";

import { Gallery, Carousel } from "./components";
import { Image } from "./interfaces";

import "./App.css";

function App() {
  const [isSliderView, setIsSliderView] = useState<boolean>(false);
  const [images, setImages] = useState<Image[]>([]);

  const handleToggleButtonPress = () => {
    setIsSliderView((prev) => !prev);
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) return;

    fetch(`${apiUrl}/images`)
      .then((data) => data.json())
      .then((images) => setImages(images));
  }, []);

  return (
    <div className={`background background-${isSliderView ? "dark" : "light"}`}>
      <button className="toggle-button" onClick={handleToggleButtonPress}>
        Toggle view
      </button>
      {isSliderView && <Carousel images={images} />}
      {!isSliderView && <Gallery images={images} />}
    </div>
  );
}

export default App;
