"use client";
import Image from "next/image";
import { motion } from "framer-motion";
interface GalleryItemProps {
  src: string;
  alt: string;
  onClick: () => void;
}
export function GalleryItem({ src, alt, onClick }: GalleryItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-110"
      />{" "}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  );
}
