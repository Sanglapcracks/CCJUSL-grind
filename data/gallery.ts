import { GalleryItem } from "@/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/events/hackforge.jpg",
    alt: "HackForge 2025 — Teams collaborating",
    category: "hackathons",
    caption: "Teams building innovative solutions at HackForge 2025",
  },
  {
    id: "g2",
    src: "/images/posters/hackforge.webp",
    alt: "HackForge 2025 Official Poster",
    category: "hackathons",
    caption: "HackForge 2025 — An electrifying offline hackathon",
  },
  {
    id: "g3",
    src: "/images/events/h42.webp",
    alt: "H42 Competitive Programming Contest",
    category: "competitions",
    caption: "Participants competing in the H42 coding challenge",
  },
  {
    id: "g4",
    src: "/images/posters/h42.webp",
    alt: "H42 Official Poster",
    category: "competitions",
    caption: "H42 — Code to glory in this algorithmic battle",
  },
  {
    id: "g5",
    src: "/images/events/sherlocked.png",
    alt: "Sherlocked CTF Event",
    category: "competitions",
    caption: "Teams cracking codes at Sherlocked CTF",
  },
  {
    id: "g6",
    src: "/images/posters/sherlocked.webp",
    alt: "Sherlocked Official Poster",
    category: "competitions",
    caption: "Sherlocked — A thrilling battle of intellect",
  },
  {
    id: "g7",
    src: "/images/events/ptb.jpg",
    alt: "Pass the Baton Contest",
    category: "competitions",
    caption: "The unique relay-style competitive programming event",
  },
  {
    id: "g8",
    src: "/images/posters/ptb.webp",
    alt: "Pass the Baton Official Poster",
    category: "competitions",
    caption: "Pass the Baton — Teamwork meets algorithmic prowess",
  },
  {
    id: "g9",
    src: "/images/events/hackforge.jpg",
    alt: "Workshop session at CodeClub",
    category: "workshops",
    caption: "Hands-on workshop on modern web development",
  },
  {
    id: "g10",
    src: "/images/events/h42.webp",
    alt: "Club activities session",
    category: "club-activities",
    caption: "CodeClub JUSL members during a collaborative coding session",
  },
  {
    id: "g11",
    src: "/images/events/sherlocked.png",
    alt: "Cryptography workshop",
    category: "workshops",
    caption: "Deep dive into cryptography and cybersecurity",
  },
  {
    id: "g12",
    src: "/images/events/hackforge.jpg",
    alt: "Hackathon presentations",
    category: "hackathons",
    caption: "Final presentations at the hackathon",
  },
];

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "workshops", label: "Workshops" },
  { key: "hackathons", label: "Hackathons" },
  { key: "competitions", label: "Competitions" },
  { key: "club-activities", label: "Club Activities" },
] as const;
