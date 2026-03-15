"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Linkedin,
  Twitter,
  Mail,
  Award,
  Briefcase,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { teamMembers } from "@/lib/team-data";

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-navy mb-4">
              Team Member Not Found
            </h1>
            <p className="text-gray-500 mb-8">
              The profile you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/about#team"
              className="inline-flex items-center gap-2 bg-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-dark transition-all"
            >
              <ArrowLeft size={18} />
              Back to Team
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const otherMembers = teamMembers.filter((m) => m.slug !== slug);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, rgba(245,146,27,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245,146,27,0.2) 0%, transparent 50%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <nav className="flex items-center gap-2 text-sm text-white/60">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight size={14} />
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
                <ChevronRight size={14} />
                <Link
                  href="/about#team"
                  className="hover:text-white transition-colors"
                >
                  Team
                </Link>
                <ChevronRight size={14} />
                <span className="text-white">{member.name}</span>
              </nav>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-light to-navy flex items-center justify-center">
                      <span className="text-8xl font-bold text-white/20">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-6">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-orange hover:border-orange transition-all"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-orange hover:border-orange transition-all"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-orange hover:border-orange transition-all"
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/20 text-orange text-sm font-medium mb-4">
                  <Briefcase size={14} />
                  {member.role}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  {member.name}
                </h1>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                  {member.excerpt}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Bio */}
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                      <Briefcase size={20} />
                    </div>
                    Professional Background
                  </h2>
                </AnimatedSection>

                <div className="space-y-5">
                  {member.bio.map((paragraph, i) => (
                    <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {paragraph}
                      </p>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Expertise */}
                {member.expertise && member.expertise.length > 0 && (
                  <AnimatedSection delay={0.2}>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <Award size={18} className="text-orange" />
                        Areas of Expertise
                      </h3>
                      <ul className="space-y-3">
                        {member.expertise.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>
                )}

                {/* Qualifications */}
                {member.qualifications && member.qualifications.length > 0 && (
                  <AnimatedSection delay={0.3}>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                        <GraduationCap size={18} className="text-orange" />
                        Qualifications
                      </h3>
                      <ul className="space-y-3">
                        {member.qualifications.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-navy mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>
                )}

                {/* Contact CTA */}
                <AnimatedSection delay={0.4}>
                  <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      Want to connect with {member.name.split(" ")[0]}?
                    </p>
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
                      >
                        <Mail size={16} />
                        Send an Email
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Other Team Members */}
        {otherMembers.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-navy mb-8 text-center">
                  Other Team Members
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherMembers.map((m, index) => (
                  <AnimatedSection key={m.slug} delay={index * 0.1}>
                    <Link href={`/about/team/${m.slug}`}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-orange/20 transition-all group"
                      >
                        <div className="h-40 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative overflow-hidden">
                          {m.image ? (
                            <Image
                              src={m.image}
                              alt={m.name}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white text-3xl font-bold">
                              {m.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-navy">{m.name}</h3>
                          <p className="text-orange text-sm font-medium mb-2">
                            {m.role}
                          </p>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange group-hover:text-orange-dark transition-colors">
                            View Profile
                            <ArrowLeft
                              size={14}
                              className="rotate-180 group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  href="/about#team"
                  className="inline-flex items-center gap-2 text-navy hover:text-orange font-semibold transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to About Page
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
