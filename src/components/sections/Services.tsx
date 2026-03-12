"use client";

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
} from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Service, defaultServices } from "@/lib/cms-data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Fuel,
  Droplets,
  Flame,
  Truck,
  Store,
  BarChart3,
};

export default function ServicesSection({ services: propServices }: { services?: Service[] }) {
  const services = propServices && propServices.length > 0 ? propServices : defaultServices;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: "#f9fafb" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "rgba(245,146,27,0.1)", color: "#F5921B" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#F5921B" }} />
              Our Services
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ color: "#1B2A4A" }}>
              Comprehensive{" "}
              <span className="text-gradient">Energy Solutions</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From retail fuel distribution to bulk supply and fleet management,
              we deliver complete energy solutions tailored to your needs.
            </p>
          </AnimatedSection>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Fuel;
            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group h-full rounded-2xl p-8 transition-all duration-500"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                    style={{ backgroundColor: "rgba(245,146,27,0.1)", color: "#F5921B" }}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold mb-3 transition-colors"
                    style={{ color: "#1B2A4A" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "#F5921B" }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Link */}
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300"
                    style={{ color: "#F5921B" }}
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.3} className="text-center mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "#1B2A4A" }}
          >
            View All Services
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
