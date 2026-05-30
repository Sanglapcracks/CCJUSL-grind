"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { alumniMembers } from "@/data/alumni";
import AlumniCard from "@/components/Alumni/AlumniCard";
import AlumniModal from "@/components/Alumni/AlumniModal";
import Footer from "@/components/Footer";
import type { AlumniMember } from "@/types";

export default function AlumniPage() {
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniMember | null>(
    null
  );
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div ref={headerRef} className="pb-8 pt-12 lg:pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-5xl font-semibold uppercase tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Alumni
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 h-px w-24 origin-center bg-red-400"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/50 sm:text-base"
        >
          The talented individuals who built CodeClub JUSL and went on to make
          their mark in the tech industry. We&apos;re proud of where they are today.
        </motion.p>
      </div>

      <div className="mx-auto w-11/12 max-w-7xl">
        {/* Alumni Grid */}
        <div className="grid gap-6 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {alumniMembers.map((alumni, i) => (
            <AlumniCard
              key={alumni.id}
              alumni={alumni}
              index={i}
              onClick={() => setSelectedAlumni(alumni)}
            />
          ))}
        </div>
      </div>

      {/* Alumni Modal */}
      <AlumniModal
        alumni={selectedAlumni}
        onClose={() => setSelectedAlumni(null)}
      />

      <Footer />
    </div>
  );
}
