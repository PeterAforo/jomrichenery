"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/animations/AnimatedSection";
import Image from "next/image";
import { defaultSiteSettings } from "@/lib/cms-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const settings = defaultSiteSettings;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      service: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone}`,
      description: "Mon-Fri 8am to 6pm",
    },
    {
      icon: Mail,
      title: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
      description: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      value: settings.address,
      href: "#",
      description: "Visit our head office",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Fri: 8am - 6pm",
      href: "#",
      description: "Stations open 24/7",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/2.jpeg"
            alt="Contact Us"
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
                Contact Us
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Get in Touch
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Have questions about our services? We&apos;re here to help. Reach
                out and let&apos;s discuss how we can power your success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-20">
              {contactInfo.map((info, index) => (
                <AnimatedSection key={info.title} delay={index * 0.1}>
                  <motion.a
                    href={info.href}
                    whileHover={{ y: -4 }}
                    className="block bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-orange/20 transition-all group text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange/10 group-hover:bg-orange group-hover:text-white flex items-center justify-center text-orange mx-auto mb-4 transition-all">
                      <info.icon size={24} />
                    </div>
                    <h3 className="font-bold text-navy mb-1">{info.title}</h3>
                    <p className="text-gray-700 text-sm font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-gray-400 text-xs">{info.description}</p>
                  </motion.a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <AnimatedSection>
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-navy">
                        Send us a Message
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Fill out the form below and we&apos;ll get back to you
                      </p>
                    </div>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <CheckCircle2
                        size={48}
                        className="text-green-500 mx-auto mb-4"
                      />
                      <h3 className="text-xl font-bold text-navy mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-500">
                        Thank you for reaching out. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-navy mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-navy mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
                            placeholder="+233 XX XXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy mb-2">
                            Service Interest
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                service: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm bg-white"
                          >
                            <option value="">Select a service</option>
                            <option value="fuel">Fuel Distribution</option>
                            <option value="lpg">LPG Supply</option>
                            <option value="bulk">Bulk Supply</option>
                            <option value="fleet">Fleet Management</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm resize-none"
                          placeholder="Tell us about your needs..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full group inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange/30"
                      >
                        <Send size={18} />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>

              {/* Map / Info Side */}
              <AnimatedSection direction="right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-navy mb-4">
                      Let&apos;s Work{" "}
                      <span className="text-gradient">Together</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Whether you need bulk fuel supply for your business, LPG
                      for your operations, or want to explore partnership
                      opportunities, our team is ready to assist you.
                    </p>
                  </div>

                  {/* Map placeholder */}
                  <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl h-80 flex items-center justify-center overflow-hidden relative">
                    <div className="text-center text-white/60">
                      <MapPin size={48} className="mx-auto mb-3 text-orange" />
                      <p className="font-medium text-white">
                        Jom Rich Energy Ltd.
                      </p>
                      <p className="text-sm">{settings.address}</p>
                    </div>
                    {/* Decorative grid */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>

                  {/* Quick facts */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="text-2xl font-bold text-orange mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-gray-500">
                        Station Availability
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100">
                      <div className="text-2xl font-bold text-orange mb-1">
                        &lt;24h
                      </div>
                      <div className="text-sm text-gray-500">
                        Response Time
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
