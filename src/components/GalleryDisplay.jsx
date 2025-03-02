import { useState } from "react";
import Image from "next/image";
import galleryData from "../data/gallery.json";

export default function GalleryDisplay() {
  const [loading, setLoading] = useState(true);
  let loadedImages = 0;

  const handleImageLoad = () => {
    loadedImages += 1;
    if (loadedImages === galleryData.length) {
      setLoading(false); // Hide loading spinner when all images are loaded
    }
  };

  return (
    <div className="p-4">
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center gap-4 mb-5">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-2xl text-primary font-bold animate-pulse">
            Loading Images...
          </p>
        </div>
      )}

      {/* Image Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity duration-500 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {galleryData.map((image, index) => (
          <div
            key={index}
            className="relative w-full aspect-square overflow-hidden rounded-xl shadow-md shadow-zinc-500 hover:shadow-lg hover:scale-105 transition-transform"
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
              priority={index < 4} // Faster loading for the first few images
              onLoadingComplete={handleImageLoad} // Trigger when image loads
            />
          </div>
        ))}
      </div>
    </div>
  );
}
