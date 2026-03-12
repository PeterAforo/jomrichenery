"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Partner } from "@/lib/cms-data";

gsap.registerPlugin(ScrollTrigger);

const defaultPartnerList = [
  { name: "Shell", color: "#DD1D21" },
  { name: "VIVO Energy", color: "#E31937" },
  { name: "TotalEnergies", color: "#FF0000" },
  { name: "GOIL", color: "#00843D" },
  { name: "BOST", color: "#003366" },
  { name: "NPA", color: "#1B4D3E" },
];

export default function PartnersSection({ partners: propPartners }: { partners?: Partner[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".partner-item");
    gsap.from(items, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section className="py-20 relative" style={{ backgroundColor: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedSection>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: "rgba(245,146,27,0.1)", color: "#F5921B" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5921B" }} />
              Our Partners
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#1B2A4A" }}>
              Trusted Industry <span className="text-gradient">Partners</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-gray-600 max-w-xl mx-auto">
              We work alongside the biggest names in the energy sector to deliver
              excellence at every touchpoint.
            </p>
          </AnimatedSection>
        </div>

        <div
          ref={scrollRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {(propPartners && propPartners.length > 0
            ? propPartners.map(p => ({ name: p.name, color: "#1B2A4A" }))
            : defaultPartnerList
          ).map((partner) => (
            <motion.div
              key={partner.name}
              whileHover={{ y: -4, scale: 1.05 }}
              className="partner-item rounded-2xl p-6 flex items-center justify-center h-28 transition-all duration-300 group cursor-pointer"
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: partner.color }}
                >
                  {partner.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
