import React from "react";
import Hero from "@/components/Home/Hero";
import AboutUniversity from "@/components/Home/AboutUniversity";
import AboutClub from "@/components/Home/AboutClub";
import Contact from "@/components/Home/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="font-jetbrains-mono relative w-full scroll-smooth bg-black overflow-x-hidden">
      {/* Fixed Hero Backdrop covering 1 screen */}
      <div className="fixed inset-0 z-0 h-screen w-full">
        <Hero />
      </div>

      {/* Main content sliding up over the Hero */}
      <div className="relative z-10 mt-[100vh] w-full bg-black shadow-[0_-24px_48px_rgba(0,0,0,0.85)]">
        <AboutUniversity />
        <AboutClub />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
