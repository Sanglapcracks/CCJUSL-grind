"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Building, FileText, Download, Users } from "lucide-react";
import Magnet from "./Magnet";

interface FolderCardProps {
  company: string;
  count: number;
  contributors: string[];
  pdfPath: string;
  meta: {
    color: string;
    bgGlow: string;
    gradientLine: string;
    buttonClass: string;
    initial: string;
  };
}

const brandBorders: Record<string, {
  border: string;
  borderHover: string;
  glowDefault: string;
  glowHover: string;
  text: string;
  bgBtn: string;
  borderBtn: string;
}> = {
  "Google": {
    border: "border-blue-500/40",
    borderHover: "border-blue-400/80",
    glowDefault: "rgba(96, 165, 250, 0.15)",
    glowHover: "rgba(96, 165, 250, 0.45)",
    text: "text-blue-400",
    bgBtn: "group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-400 group-hover:shadow-[0_0_25px_rgba(96,165,250,0.6)]",
    borderBtn: "border-blue-500/40 text-blue-400 bg-blue-500/10",
  },
  "D.E. Shaw": {
    border: "border-rose-500/40",
    borderHover: "border-rose-400/80",
    glowDefault: "rgba(244, 63, 94, 0.15)",
    glowHover: "rgba(244, 63, 94, 0.45)",
    text: "text-rose-500",
    bgBtn: "group-hover:bg-rose-500 group-hover:text-black group-hover:border-rose-400 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]",
    borderBtn: "border-rose-500/40 text-rose-400 bg-rose-500/10",
  },
  "JPMC": {
    border: "border-amber-500/40",
    borderHover: "border-amber-400/80",
    glowDefault: "rgba(251, 191, 36, 0.15)",
    glowHover: "rgba(251, 191, 36, 0.45)",
    text: "text-amber-400",
    bgBtn: "group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(251,191,36,0.6)]",
    borderBtn: "border-amber-500/40 text-amber-400 bg-amber-500/10",
  },
  "Salesforce": {
    border: "border-cyan-500/40",
    borderHover: "border-cyan-400/80",
    glowDefault: "rgba(34, 211, 238, 0.15)",
    glowHover: "rgba(34, 211, 238, 0.45)",
    text: "text-cyan-400",
    bgBtn: "group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]",
    borderBtn: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
  },
  "Sprinklr": {
    border: "border-orange-500/40",
    borderHover: "border-orange-400/80",
    glowDefault: "rgba(249, 115, 22, 0.15)",
    glowHover: "rgba(249, 115, 22, 0.45)",
    text: "text-orange-500",
    bgBtn: "group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-400 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]",
    borderBtn: "border-orange-500/40 text-orange-400 bg-orange-500/10",
  },
  "Visa": {
    border: "border-indigo-500/40",
    borderHover: "border-indigo-400/80",
    glowDefault: "rgba(129, 140, 248, 0.15)",
    glowHover: "rgba(129, 140, 248, 0.45)",
    text: "text-indigo-400",
    bgBtn: "group-hover:bg-indigo-500 group-hover:text-black group-hover:border-indigo-400 group-hover:shadow-[0_0_25px_rgba(129,140,248,0.6)]",
    borderBtn: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
  },
  "Wells Fargo": {
    border: "border-emerald-500/40",
    borderHover: "border-emerald-400/80",
    glowDefault: "rgba(52, 211, 153, 0.15)",
    glowHover: "rgba(52, 211, 153, 0.45)",
    text: "text-emerald-400",
    bgBtn: "group-hover:bg-emerald-500 group-hover:text-black group-hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.6)]",
    borderBtn: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  }
};

const defaultBrand = {
  border: "border-red-500/40",
  borderHover: "border-red-400/80",
  glowDefault: "rgba(239, 68, 68, 0.15)",
  glowHover: "rgba(239, 68, 68, 0.45)",
  text: "text-red-500",
  bgBtn: "group-hover:bg-red-500 group-hover:text-black group-hover:border-red-400 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]",
  borderBtn: "border-red-500/40 text-red-400 bg-red-500/10",
};

export default function FolderCard({
  company,
  count,
  contributors,
  pdfPath,
  meta,
}: FolderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Mouse tilt configuration
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { damping: 25, stiffness: 200 });

  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;
    
    x.set(relativeX);
    y.set(relativeY);

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  const brand = brandBorders[company] || defaultBrand;

  return (
    <a
      href={pdfPath}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative mt-8 pt-1 group w-full h-[370px] outline-none"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="w-full h-full relative"
      >
        {/* Layer 1: Folder Back Panel (With distinct borders and drop shadows in 3D) */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[320px] rounded-b-2xl rounded-tr-2xl bg-[#0c0c0c] border transition-all duration-500 z-0 ${
            isHovered ? brand.borderHover : brand.border
          }`}
          style={{
            transform: "translateZ(0px)",
            boxShadow: isHovered
              ? `0 35px 65px -10px ${brand.glowHover}, 0 0 45px ${brand.glowHover}`
              : `0 12px 36px rgba(0,0,0,0.8), 0 0 25px ${brand.glowDefault}`,
          }}
        >
          {/* Top Folder Tab sticking up */}
          <div
            className={`absolute -top-[27px] left-0 h-[28px] px-4 bg-[#0c0c0c] border-t border-x rounded-t-xl flex items-center gap-1.5 transition-all duration-500 ${
              isHovered ? brand.borderHover : brand.border
            }`}
            style={{
              transform: "translateZ(2px)",
            }}
          >
            <Building size={11} className={`transition-colors duration-500 ${isHovered ? brand.text : "text-white/40"}`} />
            <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-white/80">
              {company}
            </span>
          </div>
        </div>

        {/* Layer 2: Inner Document Sheet (Bright document top border representing paper) */}
        <motion.div
          animate={{
            y: isHovered ? -50 : 8,
            scale: isHovered ? 1.015 : 0.98,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 18,
          }}
          className="absolute left-[3%] w-[94%] h-[300px] bg-[#161616] border-x border-b border-t-2 border-white/15 rounded-2xl p-6 z-10 flex flex-col justify-between"
          style={{
            transform: "translateZ(10px)",
            borderTopColor: "rgba(255, 255, 255, 0.35)", // Paper top-border highlight
            boxShadow: isHovered ? `0 15px 35px ${brand.glowHover}` : "none",
          }}
        >
          {/* File Header */}
          <div className="flex flex-col">
            <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
              INTERVIEW GUIDE RESOURCE // PDF ATTACHMENT
            </span>
            <div className="w-full h-[1px] bg-white/5 mt-1.5 mb-4" />
          </div>

          {/* Document Center Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2 py-4">
            <div className="relative mb-3.5">
              <div className="absolute inset-0 rounded-full blur-md opacity-30 animate-pulse bg-gradient-to-r from-white to-transparent" />
              <FileText size={36} className={`relative z-10 ${brand.text} opacity-90`} />
            </div>
            
            <span className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-1.5">
              {company} Placement Guide
            </span>
            
            <p className="text-[11px] font-sans text-neutral-300 font-light leading-relaxed max-w-[200px]">
              Click anywhere on this card folder to access the complete PDF document immediately.
            </p>
          </div>

          {/* Professional Download CTA button */}
          <div className="w-full">
            <Magnet className="w-full" magnetStrength={0.12}>
              <div
                className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[10px] font-syne font-bold uppercase tracking-widest text-white transition-all duration-300 ${brand.borderBtn} ${brand.bgBtn}`}
                style={{ transform: "translateZ(5px)" }}
              >
                <Download
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
                Open & Download Guide
              </div>
            </Magnet>
          </div>
        </motion.div>

        {/* Layer 3: Folder Front Cover (Slightly tilted forward by default to create a 3D pocket) */}
        <motion.div
          animate={{
            rotateX: isHovered ? -24 : -4, // -4deg by default to reveal document sheet in 3D mouth
            y: isHovered ? 20 : 0,
            scale: isHovered ? 0.985 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 18,
          }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "bottom center",
            transform: "translateZ(20px)",
          }}
          className={`absolute bottom-0 left-0 w-full h-[320px] rounded-b-2xl rounded-tr-2xl bg-neutral-900 border p-6 flex flex-col justify-between overflow-hidden z-20 transition-colors duration-500 ${
            isHovered ? brand.borderHover : brand.border
          }`}
        >
          {/* Spotlight cursor tracking background */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${brand.glowHover}, transparent 75%)`,
            }}
          />

          {/* Decorative Top Accent Line */}
          <div
            className={`absolute top-0 left-0 h-[2.5px] w-full bg-gradient-to-r ${meta.gradientLine} opacity-30 transition-opacity duration-500 group-hover:opacity-100`}
          />

          {/* Large Watermark Background Letter */}
          <div
            className={`absolute -bottom-6 -right-2 text-[200px] font-bebas-neue select-none pointer-events-none transition-all duration-700 ease-out leading-none z-0 ${
              isHovered ? `${brand.text} opacity-[0.14] scale-105 -translate-x-1 -translate-y-1` : "text-white opacity-[0.02] scale-100"
            }`}
            style={{ transform: "translateZ(8px)" }}
          >
            {meta.initial}
          </div>

          {/* Sleeve text & details */}
          <div 
            className="relative z-10 flex flex-col justify-between h-full w-full"
            style={{ transform: "translateZ(15px)" }}
          >
            {/* Header Row */}
            <div className="flex justify-between items-center w-full">
              {/* Metallic title formatting */}
              <span className="text-[25px] font-syne font-extrabold tracking-tight leading-none bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                {company}
              </span>

              {/* Experience count badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-white">
                <FileText size={11} className={brand.text} />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                  {count} {count === 1 ? "Exp" : "Exps"}
                </span>
              </div>
            </div>

            {/* Folder Cover Description */}
            <div className="mt-4 flex flex-col justify-start flex-1">
              <p className="text-sm font-sans text-neutral-100 leading-relaxed font-light mb-4">
                Complete preparation guide containing coding challenges, online assessments, technical rounds, and HR strategies compiled from real interview experiences.
              </p>

              {/* Contributing Students Section */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Users size={11} className={brand.text} />
                  <span className="text-[9px] font-syne font-bold tracking-widest uppercase text-neutral-400">
                    Students Selected & Contributed
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pr-1">
                  {contributors.map((name) => (
                    <span
                      key={name}
                      className="px-2.5 py-1 rounded bg-[#1f1f1f] border border-white/5 text-[10px] font-sans text-white font-medium transition-colors hover:bg-neutral-850"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom guide tag */}
            <div className="w-full pt-4 border-t border-white/5 flex justify-between items-center mt-3">
              <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase">
                placement resources
              </span>
              <span className="text-[9px] font-syne font-bold text-white/60 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                click to download pdf
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </a>
  );
}
