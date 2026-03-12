"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Fuel,
  Droplets,
  Flame,
  Truck,
  Store,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/animations/AnimatedSection";
import GsapReveal from "@/components/animations/GsapReveal";

import CTASection from "@/components/sections/CTA";
import { Service, defaultServices } from "@/lib/cms-data";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Fuel,
  Droplets,
  Flame,
  Truck,
  Store,
  BarChart3,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    fetch("/api/services").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setServices(data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/1.jpeg"
            alt="Jom Rich Services"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/40 to-navy-dark/80" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-orange-light text-sm font-medium mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                Our Services
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Energy Solutions
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Comprehensive petroleum products and energy solutions tailored to
                power every aspect of your business and daily life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Fuel;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={service.id}
                    id={service.id}
                    className="scroll-mt-24"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                        !isEven ? "lg:grid-flow-dense" : ""
                      }`}
                    >
                      {/* Content */}
                      <AnimatedSection
                        direction={isEven ? "left" : "right"}
                        className={!isEven ? "lg:col-start-2" : ""}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6">
                          <Icon size={32} />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          {service.description}
                        </p>

                        {service.features && (
                          <div className="space-y-3 mb-8">
                            {service.features.map((feature, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3"
                              >
                                <CheckCircle2
                                  size={20}
                                  className="text-orange flex-shrink-0"
                                />
                                <span className="text-gray-700">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <Link
                          href="/contact"
                          className="group inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                        >
                          Request This Service
                          <ArrowRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </Link>
                      </AnimatedSection>

                      {/* Visual */}
                      <AnimatedSection
                        direction={isEven ? "right" : "left"}
                        className={!isEven ? "lg:col-start-1" : ""}
                      >
                        <div className="relative">
                          <div className="bg-gradient-to-br from-navy/5 to-orange/5 rounded-3xl p-12 flex items-center justify-center min-h-[350px]">
                            <div className="text-center">
                              <div className="w-32 h-32 rounded-full bg-orange/10 mx-auto flex items-center justify-center mb-6">
                                <Icon size={64} className="text-orange" />
                              </div>
                              <h3 className="text-xl font-bold text-navy">
                                {service.title}
                              </h3>
                            </div>
                          </div>
                          {/* Decorative corner */}
                          <div
                            className={`absolute -z-10 w-full h-full top-4 ${
                              isEven ? "-right-4" : "-left-4"
                            } border-2 border-orange/10 rounded-3xl`}
                          />
                        </div>
                      </AnimatedSection>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
