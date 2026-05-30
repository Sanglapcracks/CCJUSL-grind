"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { teamCategories, teamMembers } from "@/data/teams";
import TeamCategorySelector from "@/components/Teams/TeamCategorySelector";
import TeamMemberCard from "@/components/Teams/TeamMemberCard";
import TeamMemberModal from "@/components/Teams/TeamMemberModal";
import Footer from "@/components/Footer";
import type { TeamMember } from "@/types";

export default function TeamsPage() {
  const [activeCategory, setActiveCategory] = useState<string>(teamCategories[0].key);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  const filteredMembers = teamMembers.filter(
    (m) => m.team === activeCategory
  );

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
          Our Team
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 h-px w-24 origin-center bg-red-400"
        />
      </div>

      <div className="mx-auto w-11/12 max-w-7xl">
        {/* Category Selector */}
        <div className="mb-12">
          <TeamCategorySelector
            categories={teamCategories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Category Label */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 text-center text-lg font-semibold uppercase tracking-wider text-red-400"
          >
            {teamCategories.find((c) => c.key === activeCategory)?.label}
          </motion.h2>
        </AnimatePresence>

        {/* Member Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredMembers.map((member, i) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={i}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <Footer />
    </div>
  );
}
