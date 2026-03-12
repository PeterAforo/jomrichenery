"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlide, defaultHeroSlides } from "@/lib/cms-data";

function HeroParticles() {
  const [particles, setParticles] = useState<
    { left: number; top: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange/30 rounded-full"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function Hero({ slides: propSlides }: { slides?: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);
  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultHeroSlides;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
  }, [slides.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector(".hero-overlay"),
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.inOut" }
      );
    }
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div
        className="hero-overlay absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(15,29,53,0.92), rgba(15,29,53,0.7), rgba(15,29,53,0.4))" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(15,29,53,0.8), transparent, rgba(15,29,53,0.3))" }}
      />

      {/* Animated particles/dots */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-content"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Subtitle badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm mb-6"
                  style={{ backgroundColor: "rgba(245,146,27,0.12)", border: "1px solid rgba(245,146,27,0.25)" }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#F5921B" }} />
                  <span className="text-sm font-medium" style={{ color: "#FFA940" }}>
                    {slide.subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
                >
                  {slide.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {i === slide.title.split(" ").length - 1 ? (
                        <span className="text-gradient">{word}</span>
                      ) : (
                        word + " "
                      )}
                    </span>
                  ))}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-lg"
                >
                  {slide.description}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl"
                    style={{ backgroundColor: "#F5921B" }}
                  >
                    {slide.ctaText}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  {slide.secondaryCtaText && (
                    <Link
                      href={slide.secondaryCtaLink || "#"}
                      className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 backdrop-blur-sm"
                      style={{ border: "2px solid rgba(255,255,255,0.2)" }}
                    >
                      {slide.secondaryCtaText}
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="transition-all duration-500 rounded-full"
                style={{
                  width: i === current ? 40 : 12,
                  height: 12,
                  backgroundColor: i === current ? "#F5921B" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#F5921B" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
