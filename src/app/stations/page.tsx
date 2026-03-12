"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Filter,
  Fuel,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedSection from "@/components/animations/AnimatedSection";
import ParallaxImage from "@/components/animations/ParallaxImage";
import CTASection from "@/components/sections/CTA";
import { Station, defaultStations } from "@/lib/cms-data";

export default function StationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [stations, setStations] = useState<Station[]>(defaultStations);

  useEffect(() => {
    fetch("/api/stations").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setStations(data);
    }).catch(() => {});
  }, []);

  const regions = [
    "All",
    ...Array.from(new Set(stations.map((s) => s.region))),
  ];

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || station.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
          <ParallaxImage
            src="/images/3.jpeg"
            alt="Our Stations"
            className="absolute inset-0"
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-orange-light text-sm font-medium mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-orange" />
                Find a Station
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                Our Stations
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Find a Jom Rich Energy station near you. Quality fuel and
                exceptional service at every location.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search by name, city, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm"
                />
              </div>
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all text-sm bg-white cursor-pointer"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === "All" ? "All Regions" : region}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stations Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-gray-500 text-sm">
                Showing{" "}
                <span className="font-semibold text-navy">
                  {filteredStations.length}
                </span>{" "}
                station{filteredStations.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredStations.map((station, index) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 hover:border-orange/20 transition-all duration-300 group"
                  >
                    {/* Station header */}
                    <div className="bg-gradient-to-r from-navy to-navy-light p-6 relative overflow-hidden">
                      <div className="absolute top-2 right-2 opacity-10">
                        <Fuel size={80} />
                      </div>
                      <div className="relative">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {station.name}
                        </h3>
                        <p className="text-white/60 text-sm flex items-center gap-1">
                          <MapPin size={14} />
                          {station.city}, {station.region}
                        </p>
                      </div>
                    </div>

                    {/* Station details */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-orange mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-600 text-sm">
                          {station.address}, {station.city}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock
                          size={16}
                          className="text-orange flex-shrink-0"
                        />
                        <span className="text-gray-600 text-sm">
                          {station.hours}
                        </span>
                        {station.hours === "24/7" && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            Open Now
                          </span>
                        )}
                      </div>

                      {station.phone && (
                        <div className="flex items-center gap-3">
                          <Phone
                            size={16}
                            className="text-orange flex-shrink-0"
                          />
                          <a
                            href={`tel:${station.phone}`}
                            className="text-gray-600 text-sm hover:text-orange transition-colors"
                          >
                            {station.phone}
                          </a>
                        </div>
                      )}

                      {/* Services tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {station.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredStations.length === 0 && (
              <div className="text-center py-16">
                <Fuel size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">
                  No stations found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
