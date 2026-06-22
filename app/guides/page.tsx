"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { interviewGuides } from "@/data/guides";
import {
  Search,
  FileText,
  Briefcase,
  X
} from "lucide-react";
import Footer from "@/components/Footer";
import { FEATURES } from "@/config/features";
import NotFound from "@/components/NotFound";
import DecryptText from "@/components/ui/DecryptText";
import ShinyText from "@/components/ui/ShinyText";
import Magnet from "@/components/ui/Magnet";
import FolderCard from "@/components/ui/FolderCard";

// Brand-specific metadata for dynamic, premium styling
const companyMetadata: Record<string, {
  color: string;
  bgGlow: string;
  gradientLine: string;
  buttonClass: string;
  initial: string;
}> = {
  "Google": {
    color: "text-blue-400",
    bgGlow: "rgba(96, 165, 250, 0.12)",
    gradientLine: "from-blue-400/50 via-blue-500/50 to-transparent",
    buttonClass: "border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/10",
    initial: "G"
  },
  "D.E. Shaw": {
    color: "text-rose-500",
    bgGlow: "rgba(244, 63, 94, 0.12)",
    gradientLine: "from-rose-400/50 via-rose-500/50 to-transparent",
    buttonClass: "border-rose-500/30 hover:border-rose-400 hover:bg-rose-500/10",
    initial: "D"
  },
  "JPMC": {
    color: "text-amber-400",
    bgGlow: "rgba(251, 191, 36, 0.12)",
    gradientLine: "from-amber-400/50 via-amber-500/50 to-transparent",
    buttonClass: "border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10",
    initial: "J"
  },
  "Salesforce": {
    color: "text-cyan-400",
    bgGlow: "rgba(34, 211, 238, 0.15)",
    gradientLine: "from-cyan-400/50 via-cyan-500/50 to-transparent",
    buttonClass: "border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10",
    initial: "S"
  },
  "Sprinklr": {
    color: "text-orange-500",
    bgGlow: "rgba(249, 115, 22, 0.12)",
    gradientLine: "from-orange-400/50 via-orange-500/50 to-transparent",
    buttonClass: "border-orange-500/30 hover:border-orange-400 hover:bg-orange-500/10",
    initial: "S"
  },
  "Visa": {
    color: "text-indigo-400",
    bgGlow: "rgba(129, 140, 248, 0.12)",
    gradientLine: "from-indigo-400/50 via-indigo-500/50 to-transparent",
    buttonClass: "border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-500/10",
    initial: "V"
  },
  "Wells Fargo": {
    color: "text-emerald-400",
    bgGlow: "rgba(52, 211, 153, 0.12)",
    gradientLine: "from-emerald-400/50 via-emerald-500/50 to-transparent",
    buttonClass: "border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/10",
    initial: "W"
  }
};

const defaultMeta = {
  color: "text-red-500",
  bgGlow: "rgba(239, 68, 68, 0.12)",
  gradientLine: "from-red-400/50 via-red-500/50 to-transparent",
  buttonClass: "border-red-500/30 hover:border-red-500 hover:bg-red-500/10",
  initial: "C"
};

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const companyGuides = useMemo(() => {
    const map = new Map<string, { pdfPath: string; count: number; contributors: string[] }>();
    interviewGuides.forEach((guide) => {
      const existing = map.get(guide.company);
      const name = guide.candidateName;
      if (existing) {
        existing.count += 1;
        if (!existing.contributors.includes(name)) existing.contributors.push(name);
      } else {
        map.set(guide.company, { pdfPath: guide.pdfPath, count: 1, contributors: [name] });
      }
    });
    return Array.from(map.entries()).map(([company, data]) => ({ company, ...data }));
  }, []);

  const filteredCompanyGuides = useMemo(() => {
    return companyGuides.filter((guide) =>
      guide.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companyGuides, searchQuery]);

  if (!FEATURES.enableGuides) return <NotFound />;

  return (
    <div className="min-h-screen bg-black text-[#ededed] font-jetbrains-mono selection:bg-red-500/30 selection:text-red-200">
      {/* Subtle Grid Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-red-900/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl pt-12 pb-24">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-center pb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-6 backdrop-blur-md cursor-default"
          >
            <Briefcase size={14} className="text-red-500" />
            <ShinyText text="Ace Your Placement & Internships" className="text-xs font-semibold uppercase tracking-widest text-white/80" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl md:text-6xl cursor-default"
          >
            <DecryptText text="Interview" animateOnHover speed={40} />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              <DecryptText text="Guides" animateOnHover speed={40} delay={150} />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50"
          >
            Download official, compiled company interview guides. Read about preparation strategies, online assessment questions, and technical/HR round experiences shared by students.
          </motion.div>
        </div>

        {/* Filters & Search Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-white/10 mb-10 gap-4">
          <h2 className="text-lg font-semibold uppercase tracking-wider text-white">
            Available Guides ({filteredCompanyGuides.length})
          </h2>

          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-2.5 text-sm bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
            />
            {searchQuery && (
              <Magnet className="absolute right-3.5 top-[30%] flex items-center justify-center" magnetStrength={0.2}>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-white/30 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <X size={14} />
                </button>
              </Magnet>
            )}
          </div>
        </div>

        {/* Guides Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCompanyGuides.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6 gap-y-16 lg:gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCompanyGuides.map((guide, idx) => {
                const meta = companyMetadata[guide.company] || defaultMeta;

                return (
                  <motion.div
                    layout
                    key={guide.company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    className="z-10"
                  >
                    <FolderCard
                      company={guide.company}
                      count={guide.count}
                      contributors={guide.contributors}
                      pdfPath={guide.pdfPath}
                      meta={meta}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]"
            >
              <FileText size={48} className="mx-auto text-white/10 mb-4" />
              <h3 className="text-lg font-semibold tracking-wide text-white/80">No Guides Found</h3>
              <p className="text-sm text-white/40 mt-1 font-light">Try searching for a different company name.</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <Footer />
    </div>
  );
}
