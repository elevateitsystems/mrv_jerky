"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { GalleryGrid } from "./galleryGrid";
import { GalleryHeader } from "./galleryHeader";

export const galleryImages = [
  { id: 1, src: "/images/packaging.jpg", alt: "Premium Beef Jerky" },
  { id: 2, src: "/images/img2.jpeg", alt: "Small Batch Production" },
  { id: 3, src: "/images/img1.jpeg", alt: "Fresh Ingredients" },
  { id: 4, src: "/images/pupup-image.jpg", alt: "MRV Products" },
  { id: 5, src: "/images/img5.jpeg", alt: "Mountain Lifestyle" },
  { id: 6, src: "/images/img6.jpeg", alt: "Premium Packaging" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  return (
    <>
      <section
        id="gallery"
        className="border-y border-primary/20 bg-black py-20 text-white md:py-28"
      >
        <div className="container mx-auto px-4 md:px-6">
          <GalleryHeader />
          <GalleryGrid images={galleryImages} onSelect={setSelectedImage} />
        </div>
      </section>
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="border-zinc-800 bg-[#09070c] p-2 sm:max-w-5xl">
          {selectedImage && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                 sizes="(max-width: 768px) 95vw, (max-width: 1200px) 80vw, 70vw"
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
