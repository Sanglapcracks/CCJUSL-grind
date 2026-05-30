import Link from "next/link";
import Image from "next/image";
import React from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/teams", label: "Teams" },
  { href: "/alumni", label: "Alumni" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/codeclub-jusl/",
    label: "LinkedIn",
  },
  { href: "https://youtube.com/@codeclubjusl", label: "YouTube" },
  { href: "https://www.instagram.com/jusl_codeclub", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-gray-300/50 bg-black">
      <div className="mx-auto grid w-11/12 max-w-7xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Branding */}
        <div className="flex flex-col items-center gap-4 sm:items-start lg:col-span-2">
          <Link href="/">
            <Image
              src="/images/Secondary-Main-Light.png"
              alt="CodeClub JUSL Logo"
              width={160}
              height={160}
              className="h-auto w-32"
            />
          </Link>
          <h2 className="text-2xl font-semibold lg:text-3xl">
            <span className="text-white">Code</span>
            <span className="text-[#ed1b58]">Club</span> JUSL
          </h2>
          <p className="text-center text-sm text-white/50 sm:text-left">
            The official coding club of Jadavpur University, Salt Lake Campus.
            Building a community of passionate technologists since 2018.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Quick Links
          </h3>
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Connect
          </h3>
          <nav className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="text-sm uppercase tracking-wide text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="mailto:codeclubjusl@gmail.com"
              className="text-sm tracking-wide text-white/60 transition-colors hover:text-white"
            >
              codeclubjusl@gmail.com
            </Link>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-t-gray-300/50">
        <p className="py-4 text-center text-xs uppercase tracking-wider text-white/40">
          &copy; {new Date().getFullYear()} CodeClub JUSL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
