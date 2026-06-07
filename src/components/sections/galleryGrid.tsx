"use client";
import { GalleryItem } from "./galleryItem";
interface GalleryGridProps {
  images: { id: number; src: string; alt: string }[];
  onSelect: (image: { id: number; src: string; alt: string }) => void;
}
export function GalleryGrid({ images, onSelect }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
      {" "}
      {images.map((image) => (
        <GalleryItem
          key={image.id}
          src={image.src}
          alt={image.alt}
          onClick={() => onSelect(image)}
        />
      ))}
    </div>
  );
}
