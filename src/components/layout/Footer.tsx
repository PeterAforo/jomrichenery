"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Fuel,
} from "lucide-react";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { SiteSettings, FooterColumn, defaultSiteSettings, defaultFooterColumns } from "@/lib/cms-data";

export default function Footer({ settings: propSettings, columns: propColumns }: { settings?: SiteSettings; columns?: FooterColumn[] }) {
  const settings = propSettings ?? defaultSiteSettings;
  const columns = propColumns && propColumns.length > 0 ? propColumns : defaultFooterColumns;

  const socialIcons: Record<string, React.ReactNode> = {
    facebook: <Facebook size={18} />,
    twitter: <Twitter size={18} />,
    instagram: <Instagram size={18} />,
    linkedin: <Linkedin size={18} />,
    youtube: <Youtube size={18} />,
  };

  return (
    <footer className="text-white relative overflow-hidden" style={{ backgroundColor: "#0F1D35" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #D47A10, #F5921B, #FFA940)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <AnimatedSection className="lg:col-span-2" direction="up">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={settings.logo}
                alt={settings.siteName}
                width={200}
                height={56}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              {settings.description}
            </p>
            <div className="space-y-3">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 text-white/60 hover:text-orange transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={14} />
                </div>
                {settings.email}
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3 text-white/60 hover:text-orange transition-colors text-sm"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                {settings.phone}
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                {settings.address}
              </div>
            </div>
          </AnimatedSection>

          {/* Link Columns */}
          {columns.map((column, index) => (
            <AnimatedSection
              key={column.id}
              direction="up"
              delay={0.1 * (index + 1)}
            >
              <h3 className="text-white font-semibold text-base mb-6">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-orange text-sm transition-all duration-300 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Fuel size={16} className="text-orange" />
              <span>
                © {new Date().getFullYear()} {settings.siteName}. All rights
                reserved.
              </span>
            </div>
            <span className="text-white/30 text-xs">
              Developed by{" "}
              <a
                href="https://www.mcaforo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange/70 hover:text-orange transition-colors"
              >
                Mcaforo
              </a>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {Object.entries(settings.socialLinks).map(([key, url]) => {
              if (!url) return null;
              return (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-orange/20 flex items-center justify-center text-white/50 hover:text-orange transition-all duration-300"
                >
                  {socialIcons[key]}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link
              href="/privacy"
              className="hover:text-orange transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
