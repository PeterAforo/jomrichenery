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
    title: "Integrity",
    description: "We operate transparently and ethically in every aspect of our business, building lasting trust with our partners and customers.",
  },
  {
    icon: Award,
    title: "Safety First",
    description: "We prioritize safety in all operations, from transportation to retail distribution, ensuring the well-being of our employees and communities.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver beyond expectations through uncompromising standards of quality, service, and operational performance.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We embrace modern fuel automation and energy technologies to drive efficiency and better serve our customers.",
  },
  {
    icon: Users,
    title: "Reliability",
    description: "We are dependable partners in energy supply, delivering consistent quality and service when our customers need us most.",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "We operate responsibly toward our environment and the communities we serve, ensuring a sustainable energy future.",
  },
];

const team = [
  {
    name: "ISAAC ABANGA",
    role: "Founder & Chief Executive Officer",
    bio: "Isaac Abanga is an executive leader, Petroleum Economist, and entrepreneur with over 21 years of progressive experience in Ghana's downstream petroleum industry and West Africa's energy trading environment. He has risen through leadership ranks to serve as General Manager across three Oil Marketing Companies (OMCs) and has also led regional trading operations within a multinational petroleum and petrochemical context. Across his career, Isaac has demonstrated strong capability in business restructuring, commercial strategy, petroleum pricing, operational governance, retail network expansion, and regulatory engagement.",
  },
  {
    name: "RICHARD OWUSU",
    role: "Chief Operations Officer",
    bio: "Richard oversees all operational activities, ensuring efficiency and excellence across all stations and distribution networks.",
  },
  {
    name: "GRACE ADJEI",
    role: "Head of Finance",
    bio: "Grace brings financial expertise and strategic planning to drive the company's fiscal health and ensure sustainable growth.",
  },
  {
    name: "KWADWO BOATENG",
    role: "Head of Distribution",
    bio: "Kwadwo manages the nationwide distribution network, ensuring timely fuel delivery across Ghana with operational excellence.",
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
                    Powering{" "}
                    <span className="text-gradient">Progress</span> Across Ghana
                  </h2>
                </AnimatedSection>

                <AnimatedSection delay={0.1}>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Jom Rich Energy Company Limited provides integrated oil and gas services, 
                    bulk petroleum distribution, and innovative fuel automation systems with uncompromising 
                    standards of safety, quality, and integrity. We serve as a trusted partner 
                    in Ghana's energy sector and West Africa's trading environment.
                  </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Our commitment to operational excellence and customer satisfaction has established us 
                    as a reliable energy partner, delivering consistent quality petroleum products 
                    and services across the nation.
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
                    alt="Jom Rich Operations"
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
                    To provide integrated oil and gas services, bulk petroleum distribution, 
                    and innovative fuel automation systems with uncompromising standards of safety, 
                    quality, and integrity.
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
                    To build a resilient energy brand that drives economic growth and 
                    fuels Africa's industrial transformation.
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
