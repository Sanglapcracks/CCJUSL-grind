import React from "react";
import Hero from "@/components/Home/Hero";
import Gallery from "@/components/Home/Gallery";
import Contact from "@/components/Home/Contact";
import Events from "@/components/Home/Events";
import Navbar from "@/components/Navbar";

function page() {
  return (
    <div className="font-jetbrains-mono absolute w-full scroll-smooth">
      <div className="fixed z-10 flex h-screen flex-col items-center">
        <Navbar />
        <Hero />
      </div>
      <div className="relative top-0 z-20 mt-[100vh] lg:sticky lg:h-screen">
        <Gallery />
        <Events />
        <Contact />
      </div>
    </div>
  );
}

export default page;
