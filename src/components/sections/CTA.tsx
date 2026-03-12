"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #D47A10 0%, #F5921B 50%, #E8A020 100%)" }}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Join thousands of satisfied customers who trust Jom Rich Energy for
            their fuel and energy needs. Let&apos;s power your success together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: "#1B2A4A" }}
            >
              Get in Touch
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <a
              href="tel:+233300000000"
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Phone size={18} />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
