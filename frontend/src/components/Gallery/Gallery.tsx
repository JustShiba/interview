import React from "react";

import { Image } from "../../interfaces";

import "./gallery.css";

interface GalleryProps {
  images: Image[];
}

export const Gallery = ({ images }: GalleryProps) => {
  if (images.length === 0) {
    return <h1>There are no images</h1>;
  }

  return (
    <div className="gallery-box">
      {images.length &&
        images.map((image) => (
          <div className="gallery-card" key={`${image.id}${image.albumId}`}>
            <img src={image.url || image.path} alt="card-img" />
            {image.title && <p>{image.title}</p>}
          </div>
        ))}
    </div>
  );
};
