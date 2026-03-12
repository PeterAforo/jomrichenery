"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Award,
  Users,
  Zap,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/animations/AnimatedSection";
import GsapReveal from "@/components/animations/GsapReveal";

import StatsSection from "@/components/sections/Stats";
import CTASection from "@/components/sections/CTA";

const values = [
  {
    icon: Shield,
    title: "Safety",
    description:
      "We prioritize safety in every operation, from transportation to retail distribution, ensuring the well-being of our employees and communities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for operational excellence in everything we do, from product quality to customer service delivery.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We conduct business with the highest ethical standards, building trust through transparency and accountability.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We are committed to the development of the communities we serve, creating jobs and supporting local initiatives.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We embrace modern technology and innovative solutions to improve efficiency and better serve our customers.",
  },
  {
    icon: Target,
    title: "Reliability",
    description:
      "Our customers count on us for consistent, timely delivery of quality petroleum products across the nation.",
  },
];

const team = [
  {
    name: "Joseph Mensah",
    role: "Chief Executive Officer",
    bio: "With over 20 years in the energy sector, Joseph leads Jom Rich with a vision for sustainable growth.",
  },
  {
    name: "Richael Owusu",
    role: "Chief Operations Officer",
    bio: "Richael oversees all operational activities, ensuring efficiency and excellence across all stations.",
  },
  {
    name: "Grace Adjei",
    role: "Head of Finance",
    bio: "Grace brings financial expertise and strategic planning to drive the company's fiscal health.",
  },
  {
    name: "Kwadwo Boateng",
    role: "Head of Distribution",
    bio: "Kwadwo manages the nationwide distribution network, ensuring timely fuel delivery across Ghana.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/2.jpeg"
            alt="About Jom Rich Energy"
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
                About Us
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Our Story
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Building Ghana&apos;s energy future with reliability, quality, and
                unwavering commitment to excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedSection>
                  <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-6">
                    Fueling Ghana&apos;s{" "}
                    <span className="text-gradient">Progress</span> Since Day One
                  </h2>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Jom Rich Energy Company Limited was founded with a clear
                    mission: to become Ghana&apos;s most trusted petroleum products
                    distributor. From our humble beginnings, we have grown into a
                    nationwide network of fuel stations serving thousands of
                    customers daily.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our commitment to quality, safety, and customer satisfaction
                    has earned us partnerships with major international oil
                    companies and the trust of communities across Ghana. We
                    continue to expand our reach while maintaining the highest
                    standards in the industry.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                  >
                    Get in Touch
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </AnimatedSection>
              </div>

              <AnimatedSection direction="right">
                <div className="relative">
                  <Image
                    src="/images/1.jpeg"
                    alt="Jom Rich Tanker"
                    width={600}
                    height={450}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-orange/20 rounded-2xl -z-10" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-10 h-full border border-gray-100 hover:border-orange/20 transition-all group hover:shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-6 group-hover:bg-orange group-hover:text-white transition-all">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading provider of quality petroleum products and
                    energy solutions in Ghana, delivering exceptional value to our
                    customers through reliable supply, competitive pricing, and
                    outstanding service at every touchpoint.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-2xl p-10 h-full border border-gray-100 hover:border-orange/20 transition-all group hover:shadow-lg">
                  <div className="w-16 h-16 rounded-2xl bg-navy/10 flex items-center justify-center text-navy mb-6 group-hover:bg-navy group-hover:text-white transition-all">
                    <Eye size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To become West Africa&apos;s most trusted and innovative energy
                    company, driving economic growth and sustainable development
                    through cutting-edge fuel distribution and customer-first
                    energy solutions.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  Core Values
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4">
                  What Drives <span className="text-gradient">Us</span>
                </h2>
              </AnimatedSection>
            </div>

            <GsapReveal animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  whileHover={{ y: -4 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:bg-orange/5 border border-transparent hover:border-orange/20 transition-all group"
                >
                  <value.icon
                    size={28}
                    className="text-orange mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-lg font-bold text-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </GsapReveal>
          </div>
        </section>

        {/* Stats */}
        <StatsSection />

        {/* Team Section */}
        <section id="team" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange text-sm font-medium mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                  Leadership
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4">
                  Meet Our <span className="text-gradient">Team</span>
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our experienced leadership team brings together decades of
                  industry expertise to drive Jom Rich Energy forward.
                </p>
              </AnimatedSection>
            </div>

            <GsapReveal animation="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  whileHover={{ y: -8 }}
                  className="bg-gray-50 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-48 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-3xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-navy text-lg">
                      {member.name}
                    </h3>
                    <p className="text-orange text-sm font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </GsapReveal>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
