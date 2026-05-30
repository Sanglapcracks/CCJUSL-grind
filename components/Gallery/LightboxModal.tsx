"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/types";

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/20 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Previous button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-4 z-10 rounded-full border border-white/20 p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative mx-16 flex max-h-[80vh] max-w-[85vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-lg">
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              className="object-contain"
              sizes="85vw"
              priority
            />
          </div>

          {/* Caption */}
          {currentItem.caption && (
            <p className="mt-4 text-center text-sm text-white/60">
              {currentItem.caption}
            </p>
          )}

          {/* Counter */}
          <p className="mt-2 font-mono text-xs tracking-wider text-white/30">
            {currentIndex + 1} / {items.length}
          </p>
        </motion.div>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 z-10 rounded-full border border-white/20 p-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
