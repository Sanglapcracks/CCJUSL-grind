"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { upcomingEvents, pastEvents } from "@/data/events";
import type { EventDisplay } from "@/types";
import Footer from "@/components/Footer";

const tabs = [
  { key: "upcoming", label: "Upcoming Events" },
  { key: "past", label: "Past Events" },
] as const;

function EventCard({ event, index }: { event: EventDisplay; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/events/${event.slug}`} className="group block">
        <div className="overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-red-400/30 group-hover:shadow-lg group-hover:shadow-red-400/5">
          {/* Cover Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={event.coverImage}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-3 left-3 border border-red-400/50 bg-black/60 px-3 py-1 text-xs uppercase tracking-wider text-red-400 backdrop-blur-sm">
              {event.type}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 p-5">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-red-400 sm:text-xl">
              {event.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-white/50">
              {event.shortDescription}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/30">
              {event.date}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">(
    upcomingEvents.length > 0 ? "upcoming" : "past"
  );
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

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
          Events
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 h-px w-24 origin-center bg-red-400"
        />
      </div>

      {/* Tabs */}
      <div className="mx-auto w-11/12 max-w-7xl">
        <div className="mb-12 flex justify-center gap-1 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-3 text-sm uppercase tracking-wider transition-colors duration-200 ${
                activeTab === tab.key
                  ? "text-red-400"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="events-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-red-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Event Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayEvents.length > 0 ? (
              displayEvents.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-lg text-white/40">
                  {activeTab === "upcoming"
                    ? "No upcoming events at the moment. Stay tuned!"
                    : "No past events to display."}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
