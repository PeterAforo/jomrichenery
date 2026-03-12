"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Stat, defaultStats } from "@/lib/cms-data";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target, suffix = "" }: { target: string; suffix: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericPart = target.replace(/[^0-9.]/g, "");
    const textPart = target.replace(/[0-9.]/g, "");
    const end = parseFloat(numericPart);

    if (isNaN(end)) {
      setCount(target);
      return;
    }

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);

      setCount(current + textPart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection({ stats: propStats }: { stats?: Stat[] }) {
  const stats = propStats && propStats.length > 0 ? propStats : defaultStats;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F1D35 0%, #1B2A4A 50%, #2A3F6A 100%)" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#FFA940" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5921B" }} />
            Our Impact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-bold text-white mb-4"
          >
            Numbers That <span className="text-gradient">Speak</span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center p-8 rounded-2xl backdrop-blur-sm transition-all duration-500 group"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="text-4xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix || ""} />
              </div>
              <div className="text-sm font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.75)" }}>
                {stat.label}
              </div>
              <div className="h-0.5 mx-auto mt-4" style={{ width: 32, backgroundColor: "rgba(245,146,27,0.5)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
