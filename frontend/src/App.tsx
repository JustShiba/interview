import React, { useEffect, useState } from "react";

import { Gallery, Carousel } from "./components";

import "./App.css";

function App() {
  const [isSliderView, setIsSliderView] = useState<boolean>(false);
  const [imagesLinks, setImagesLinks] = useState<string[]>([]);

  const handleToggleButtonPress = () => {
    setIsSliderView((prev) => !prev);
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!apiUrl) return;

    fetch(`${apiUrl}/images`)
      .then((data) => data.json())
      .then((images) => setImagesLinks(images));
  }, []);

  return (
    <div className={`background background-${isSliderView ? "dark" : "light"}`}>
      <button className="toggle-button" onClick={handleToggleButtonPress}>
        Toggle view
      </button>
      {isSliderView && <Carousel imagesLinks={imagesLinks} />}
      {!isSliderView && <Gallery imagesLinks={imagesLinks} />}
    </div>
  );
}

export default App;
