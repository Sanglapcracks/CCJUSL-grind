"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAuthStatus } from "@/services/AuthService";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/teams", label: "Teams" },
  { href: "/alumni", label: "Alumni" },
];

function Navbar() {
  const path = usePathname();
  const [signedIn, setSignedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    getAuthStatus().then((res) => {
      if (res) setSignedIn(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = path === "/" ? window.innerHeight * 0.3 : 20;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  const isActive = (href: string) => {
    if (href === "/") return path === "/";
    return path.startsWith(href);
  };

  return (
    <header
      className={`font-jetbrains-mono sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 backdrop-blur-md"
          : path === "/"
          ? "bg-transparent"
          : "bg-black"
      }`}
    >
      <div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-4 lg:py-6">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center">
          {path === "/" ? (
            // Layout-preserving placeholder on homepage. The scroll-driven Hero logo docks on top of it.
            <div id="navbar-logo-placeholder" className="h-6 w-28 sm:h-8 lg:h-12 lg:w-40" />
          ) : (
            <motion.div
              layoutId="main-logo"
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <Image
                height={160}
                width={160}
                src="/images/Secondary-Main-Light.png"
                alt="CCJUSL Logo"
                className="h-auto w-28 lg:w-40"
              />
            </motion.div>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-wider lg:flex xl:gap-10 xl:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-1 transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-red-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-red-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
          {signedIn ? (
            <Link
              href="/dashboard"
              className={`border border-red-400/60 px-4 py-2 text-sm uppercase tracking-wider transition-colors duration-200 hover:bg-red-400/10 ${
                isActive("/dashboard") ? "bg-red-400/10 text-red-400" : "text-red-400"
              }`}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/signin"
              className={`border border-red-400/60 px-4 py-2 text-sm uppercase tracking-wider transition-colors duration-200 hover:bg-red-400/10 ${
                isActive("/signin") ? "bg-red-400/10 text-red-400" : "text-red-400"
              }`}
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 p-2 text-white lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-6 bg-black/98 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`text-2xl uppercase tracking-widest transition-colors ${
                    isActive(link.href)
                      ? "text-red-400"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
            >
              {signedIn ? (
                <Link
                  href="/dashboard"
                  className="border border-red-400/60 px-6 py-3 text-lg uppercase tracking-widest text-red-400"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="border border-red-400/60 px-6 py-3 text-lg uppercase tracking-widest text-red-400"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
