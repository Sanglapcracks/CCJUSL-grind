"use client";

import React from "react";
import { motion } from "framer-motion";

interface TeamCategorySelectorProps {
  categories: readonly { key: string; label: string }[];
  activeCategory: string;
  onSelect: (key: string) => void;
}

export default function TeamCategorySelector({
  categories,
  activeCategory,
  onSelect,
}: TeamCategorySelectorProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {categories.map((cat, i) => {
        const isActive = activeCategory === cat.key;
        return (
          <motion.button
            key={cat.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => onSelect(cat.key)}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
              isActive ? "scale-105" : "opacity-70 hover:opacity-100"
            }`}
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-20 sm:w-20 ${
                isActive
                  ? "border-red-400 bg-red-400/10 shadow-lg shadow-red-400/10"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <span
                className={`text-lg font-bold transition-colors duration-300 sm:text-xl ${
                  isActive ? "text-red-400" : "text-white/60"
                }`}
              >
                {cat.label
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </div>
            <span
              className={`max-w-20 text-center text-[10px] uppercase tracking-wider transition-colors duration-300 sm:max-w-24 sm:text-xs ${
                isActive ? "text-red-400" : "text-white/40"
              }`}
            >
              {cat.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
