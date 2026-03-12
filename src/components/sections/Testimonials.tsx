"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Testimonial, defaultTestimonials } from "@/lib/cms-data";

export default function TestimonialsSection({ testimonials: propTestimonials }: { testimonials?: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const testimonials = propTestimonials && propTestimonials.length > 0 ? propTestimonials : defaultTestimonials;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: "white" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(245,146,27,0.1)", color: "#F5921B" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5921B" }} />
              Testimonials
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ color: "#1B2A4A" }}>
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl p-8 lg:p-12"
              style={{ backgroundColor: "#f9fafb" }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-8" style={{ color: "rgba(245,146,27,0.1)" }}>
                <Quote size={80} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    style={{ color: "#F5921B", fill: "#F5921B" }}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-xl lg:text-2xl leading-relaxed mb-8 font-medium relative z-10" style={{ color: "#1B2A4A" }}>
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #F5921B, #E8A020)" }}
                  >
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: "#1B2A4A" }}>
                      {testimonials[current].name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonials[current].role},{" "}
                      {testimonials[current].company}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    style={{ border: "1px solid #e5e7eb", color: "#1B2A4A" }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    style={{ border: "1px solid #e5e7eb", color: "#1B2A4A" }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 32 : 10,
                  height: 10,
                  backgroundColor: i === current ? "#F5921B" : "#d1d5db",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
