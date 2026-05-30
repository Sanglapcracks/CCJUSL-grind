"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/gallery";

export default function GalleryPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Auto-scroll to center on mount
  useEffect(() => {
    if (scrollRef.current && isInView) {
      const container = scrollRef.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      container.scrollLeft = scrollWidth / 3;
    }
  }, [isInView]);

  const previewItems = galleryItems.slice(0, 8);

  return (
    <section ref={sectionRef} className="w-full bg-black py-20 lg:py-28">
      <div className="mx-auto w-11/12 max-w-7xl">
        <SectionHeading className="mb-12 lg:mb-16">Gallery</SectionHeading>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Scrollable gallery */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide sm:px-8 lg:px-16 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {previewItems.map((item, i) => {
            const isCenter = i === Math.floor(previewItems.length / 2);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`relative flex-shrink-0 overflow-hidden rounded-lg border border-white/10 ${
                  isCenter
                    ? "h-64 w-80 sm:h-80 sm:w-[28rem]"
                    : "h-52 w-64 sm:h-64 sm:w-80"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="pointer-events-none object-cover transition-transform duration-500 hover:scale-105"
                  sizes="320px"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {item.caption && (
                  <p className="pointer-events-none absolute bottom-3 left-3 right-3 text-xs text-white/70">
                    {item.caption}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/gallery"
          className="border border-red-400/60 px-6 py-3 text-sm uppercase tracking-wider text-red-400 transition-all duration-300 hover:bg-red-400 hover:text-black"
        >
          View Full Gallery
        </Link>
      </div>
    </section>
  );
}
