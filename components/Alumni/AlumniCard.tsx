"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
import type { AlumniMember } from "@/types";

interface AlumniCardProps {
  alumni: AlumniMember;
  index: number;
  onClick: () => void;
}

export default function AlumniCard({ alumni, index, onClick }: AlumniCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group flex flex-col items-center gap-4 rounded-lg border border-white/10 p-6 text-center transition-all duration-300 hover:border-red-400/30 hover:shadow-lg hover:shadow-red-400/5"
    >
      {/* Photo */}
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 transition-all duration-300 group-hover:border-red-400/40 sm:h-28 sm:w-28">
        <Image
          src={alumni.photo}
          alt={alumni.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="112px"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-red-400 sm:text-base">
          {alumni.name}
        </h3>
        <p className="text-xs text-white/40">Class of {alumni.graduationYear}</p>
      </div>

      {/* Company & Role */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-medium uppercase tracking-wider text-red-400/70">
          {alumni.company}
        </p>
        <p className="text-xs text-white/30">{alumni.role}</p>
      </div>

      {/* Social Links */}
      <div className="flex gap-3">
        {alumni.socials.linkedin && (
          <span className="text-white/20 transition-colors group-hover:text-white/50">
            <Linkedin size={14} />
          </span>
        )}
        {alumni.socials.github && (
          <span className="text-white/20 transition-colors group-hover:text-white/50">
            <Github size={14} />
          </span>
        )}
        {alumni.socials.twitter && (
          <span className="text-white/20 transition-colors group-hover:text-white/50">
            <Twitter size={14} />
          </span>
        )}
      </div>
    </motion.button>
  );
}
