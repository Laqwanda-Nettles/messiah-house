// components/GalleryDisplay.js
import Image from "next/image";
import { useState } from "react";

export default function GalleryDisplay() {
  const imagePaths = Array.from(
    { length: 16 },
    (_, i) => `/gallery/gallery${i + 1}.jpeg`
  );
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center gap-4 mb-5">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-2xl text-primary font-bold animate-pulse">
            Loading Images...
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {imagePaths.map((path) => (
          <div key={path} className="card w-full bg-base-100 shadow-xl">
            <figure
              className="aspect-w-16 aspect-h-9"
              style={{ width: "350px", height: "400px" }}
            >
              <Image
                src={path}
                alt={`Gallery Image ${path}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-md shadow-success hover:shadow-lg hover:scale-105 hover:shadow-primary"
                onLoadingComplete={handleImageLoad}
                unoptimized={true}
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
