"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { events, upcomingEvents, pastEvents } from "@/data/events";

function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
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
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-3 left-3 border border-red-400/50 bg-black/60 px-3 py-1 text-xs uppercase tracking-wider text-red-400 backdrop-blur-sm">
              {event.type}
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-red-400 sm:text-xl">
              {event.name}
            </h3>
            <p className="text-xs uppercase tracking-wider text-white/40">
              {event.date}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedEvents() {
  const displayUpcoming = upcomingEvents.slice(0, 3);
  const displayPast = pastEvents.slice(0, 3);

  return (
    <section id="events" className="w-full bg-black py-20 lg:py-28">
      <div className="mx-auto w-11/12 max-w-7xl">
        <SectionHeading className="mb-16">Events</SectionHeading>

        {/* Upcoming Events */}
        {displayUpcoming.length > 0 && (
          <div className="mb-16">
            <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-red-400">
              Upcoming Events
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayUpcoming.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/events"
                className="border border-red-400/60 px-6 py-3 text-sm uppercase tracking-wider text-red-400 transition-all duration-300 hover:bg-red-400 hover:text-black"
              >
                View All Upcoming Events
              </Link>
            </div>
          </div>
        )}

        {/* Past Events */}
        {displayPast.length > 0 && (
          <div>
            <h3 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-white/50">
              Past Events
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayPast.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href="/events"
                className="border border-white/20 px-6 py-3 text-sm uppercase tracking-wider text-white/60 transition-all duration-300 hover:border-white/50 hover:text-white"
              >
                View All Past Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
