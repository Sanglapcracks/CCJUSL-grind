import { EventDisplay } from "@/types";

export const events: EventDisplay[] = [
  {
    slug: "ptb",
    name: "Pass the Baton",
    type: "Competitive Programming",
    coverImage: "/images/posters/ptb.webp",
    date: "19th April 2025",
    shortDescription:
      "A team-based competitive programming contest with a unique relay twist — each member solves problems using only clues left by the previous solver.",
    status: "past",
  },
  {
    slug: "h42",
    name: "H42",
    type: "Competitive Programming",
    coverImage: "/images/posters/h42.webp",
    date: "20th April 2025",
    shortDescription:
      "A splendid chance to prove your coding skills across multiple rounds of algorithmic challenges. Code to glory!",
    status: "past",
  },
  {
    slug: "sherlocked",
    name: "Sherlocked",
    type: "Capture the Flag",
    coverImage: "/images/posters/sherlocked.webp",
    date: "19th April 2025",
    shortDescription:
      "Unravel encrypted secrets, decode perplexing ciphers, and expose concealed truths to solve a gripping murder mystery.",
    status: "past",
  },
  {
    slug: "hackforge",
    name: "HackForge",
    type: "Hackathon",
    coverImage: "/images/posters/hackforge.webp",
    date: "30th March 2025",
    shortDescription:
      "An electrifying offline hackathon where creativity meets technology. Push your boundaries, collaborate, and bring groundbreaking ideas to life.",
    status: "past",
  },
  {
    slug: "epochalypse",
    name: "Epochalypse",
    type: "Data Science",
    coverImage: "/images/posters/hackforge.webp",
    date: "30th March 2025",
    shortDescription:
      "Embark on the ML adventure! Unleash your algorithms, analyse data, and spark innovation in this intense data science competition.",
    status: "past",
  },
];

export const upcomingEvents = events.filter((e) => e.status === "upcoming");
export const pastEvents = events.filter((e) => e.status === "past");
