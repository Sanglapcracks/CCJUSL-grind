"use client";

import Link from "next/link";
import React from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ZigZagDivider from "@/components/ui/ZigZagDivider";

function Contact() {
  return (
    <>
      {/* Zig-zag divider */}
      <div className="relative w-full bg-gradient-to-b from-black to-[#0a0a0a]">
        <ZigZagDivider />
      </div>

      <section
        id="contact"
        className="w-full bg-[#0a0a0a] py-20 lg:py-28"
      >
        <div className="mx-auto w-11/12 max-w-7xl">
          <SectionHeading className="mb-12 lg:mb-16">
            Contact Us
          </SectionHeading>

          <div className="grid w-full place-items-center gap-8 sm:grid-cols-2 lg:gap-12">
            {/* Map */}
            <AnimatedSection direction="left" delay={0.1} className="w-full">
              <iframe
                style={{ borderRadius: "12px" }}
                height="400"
                className="w-full border border-white/10"
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Jadavpur%20University,%20Salt%20Lake%20Campus+(CodeClub%20JUSL)&t=k&z=16&ie=UTF8&iwloc=B&output=embed"
                title="CodeClub JUSL Location"
              />
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection
              direction="right"
              delay={0.2}
              className="w-full"
            >
              <div className="flex w-full flex-col gap-y-8">
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
                    Address
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70 lg:text-base">
                    Plot No.8, B-73-80, Salt Lake Bypass, LB Block, Sector 3,
                    Bidhannagar, Kolkata, West Bengal 700106
                  </p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
                    Email
                  </h3>
                  <Link
                    href="mailto:codeclubjusl@gmail.com"
                    className="text-sm text-white/70 transition-colors hover:text-white lg:text-base"
                  >
                    codeclubjusl@gmail.com
                  </Link>
                </div>

                <div className="flex flex-col gap-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400">
                    Socials
                  </h3>
                  <div className="flex gap-6 text-sm uppercase tracking-wide text-white/70">
                    <Link
                      href="https://www.linkedin.com/company/codeclub-jusl/"
                      target="_blank"
                      className="transition-colors hover:text-white"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="https://youtube.com/@codeclubjusl"
                      target="_blank"
                      className="transition-colors hover:text-white"
                    >
                      YouTube
                    </Link>
                    <Link
                      href="https://www.instagram.com/jusl_codeclub"
                      target="_blank"
                      className="transition-colors hover:text-white"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
