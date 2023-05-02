import React from "react";

import "./gallery.css";

interface GalleryProps {
  imagesLinks: string[];
}

export const Gallery = ({ imagesLinks }: GalleryProps) => {
  if (imagesLinks.length === 0) {
    return <h1>There are no images</h1>;
  }

  return (
    <div className="gallery-box">
      {imagesLinks.length &&
        imagesLinks.map((link) => (
          <div className="gallery-card" key={link}>
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${link}`}
              alt={link.split(".")[0].split("_")[1] || link}
            />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </div>
        ))}
    </div>
  );
};
