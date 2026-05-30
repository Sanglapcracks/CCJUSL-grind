"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Github, Twitter } from "lucide-react";
import type { AlumniMember } from "@/types";

interface AlumniModalProps {
  alumni: AlumniMember | null;
  onClose: () => void;
}

export default function AlumniModal({ alumni, onClose }: AlumniModalProps) {
  // Keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (alumni) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [alumni, onClose]);

  return (
    <AnimatePresence>
      {alumni && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#0a0a0a] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/40 transition-colors hover:text-white"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center gap-6">
              {/* Photo */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-red-400/30">
                <Image
                  src={alumni.photo}
                  alt={alumni.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              {/* Name & Info */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white">
                  {alumni.name}
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  Class of {alumni.graduationYear}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-red-400">
                  {alumni.role} @ {alumni.company}
                </p>
              </div>

              {/* Bio */}
              <p className="text-center text-sm leading-relaxed text-white/60">
                {alumni.bio}
              </p>

              {/* Achievements */}
              <div className="w-full">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
                  Achievements
                </h3>
                <div className="space-y-2">
                  {alumni.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      <p className="text-sm text-white/50">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {alumni.socials.linkedin && (
                  <Link
                    href={alumni.socials.linkedin}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </Link>
                )}
                {alumni.socials.github && (
                  <Link
                    href={alumni.socials.github}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                  >
                    <Github size={16} /> GitHub
                  </Link>
                )}
                {alumni.socials.twitter && (
                  <Link
                    href={alumni.socials.twitter}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                  >
                    <Twitter size={16} /> Twitter
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
