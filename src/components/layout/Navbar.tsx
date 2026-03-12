"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { NavItem, SiteSettings, defaultNavItems, defaultSiteSettings } from "@/lib/cms-data";

export default function Navbar({ navItems: propNavItems, settings: propSettings }: { navItems?: NavItem[]; settings?: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const settings = propSettings ?? defaultSiteSettings;
  const navItems = propNavItems && propNavItems.length > 0 ? propNavItems : defaultNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar */}
      <div
        className={`hidden lg:block text-sm transition-all duration-500 ${
          scrolled
            ? "max-h-0 overflow-hidden opacity-0"
            : "max-h-12 opacity-100"
        }`}
        style={{ backgroundColor: "#0F1D35" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Mail size={14} />
              <span>{settings.email}</span>
            </a>
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span>{settings.phone}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-white/50">
            {settings.socialLinks.facebook && (
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
            )}
            {settings.socialLinks.linkedin && (
              <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "py-2 shadow-lg"
            : "py-3"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(15,29,53,0.6)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src={settings.logo}
                  alt={settings.siteName}
                  width={180}
                  height={50}
                  className={`h-11 w-auto transition-all duration-300 ${
                    scrolled ? "" : "brightness-0 invert"
                  }`}
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.id)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                      scrolled
                        ? "text-gray-700 hover:text-orange"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden"
                        style={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}
                      >
                        {item.children.map((child, idx) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-orange transition-all"
                            style={{
                              borderBottom:
                                idx < (item.children?.length || 0) - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-block text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "#F5921B" }}
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: scrolled ? "#1B2A4A" : "white" }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden shadow-xl"
              style={{ backgroundColor: "white", borderTop: "1px solid #e5e7eb" }}
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-gray-800 hover:text-orange rounded-lg text-base font-medium transition-all"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-6">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-gray-500 hover:text-orange text-sm transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 px-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-white px-6 py-3 rounded-full font-semibold transition-all"
                    style={{ backgroundColor: "#F5921B" }}
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
