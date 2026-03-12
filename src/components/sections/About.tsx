"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Award, Users, Zap } from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Rigorous safety standards across all operations",
  },
  {
    icon: Award,
    title: "Quality Assured",
    desc: "Premium petroleum products meeting international standards",
  },
  {
    icon: Users,
    title: "Customer Focus",
    desc: "Dedicated to exceeding customer expectations",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Modern technology for efficient energy delivery",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".about-image-wrapper"),
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: "white" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="about-image-wrapper relative rounded-2xl overflow-hidden">
              <Image
                src="/images/3.jpeg"
                alt="Jom Rich Energy Station"
                width={600}
                height={500}
                className="w-full object-cover rounded-2xl"
                style={{ height: "500px" }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(to top, rgba(15,29,53,0.4), transparent)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 rounded-2xl p-6"
              style={{
                backgroundColor: "white",
                boxShadow: "0 20px 60px rgba(27,42,74,0.15)",
                border: "1px solid #e5e7eb",
              }}
            >
              <div className="text-4xl font-bold" style={{ color: "#F5921B" }}>10+</div>
              <div className="text-sm text-gray-500 mt-1">Years of Excellence</div>
            </motion.div>

            {/* Decorative border */}
            <div
              className="absolute -top-4 -left-4 w-full h-full rounded-2xl"
              style={{ border: "2px solid rgba(245,146,27,0.2)", zIndex: -1 }}
            />
          </div>

          {/* Content Side */}
          <div>
            <AnimatedSection>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ backgroundColor: "rgba(245,146,27,0.1)", color: "#F5921B" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5921B" }} />
                About Us
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "#1B2A4A" }}>
                Powering Ghana&apos;s Growth with{" "}
                <span className="text-gradient">Premium Energy</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Jom Rich Energy Company Limited is a trusted name in Ghana&apos;s
                petroleum industry. We specialize in the distribution and retail of
                premium petroleum products, serving thousands of customers through
                our growing network of modern fuel stations nationwide.
              </p>
            </AnimatedSection>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <AnimatedSection key={feature.title} delay={0.2 + idx * 0.1}>
                  <div
                    className="p-4 rounded-xl transition-colors group"
                    style={{ backgroundColor: "#f9fafb" }}
                  >
                    <feature.icon
                      size={24}
                      className="mb-3"
                      style={{ color: "#F5921B" }}
                    />
                    <h4 className="font-semibold text-sm mb-1" style={{ color: "#1B2A4A" }}>
                      {feature.title}
                    </h4>
                    <p className="text-gray-500 text-xs">{feature.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: "#1B2A4A" }}
              >
                Discover Our Story
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
