"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Blocks,
  Fuel,
  MapPin,
  MessageSquare,
  SlidersHorizontal,
  BarChart3,
  Handshake,
  Settings,
  ArrowUpRight,
  RefreshCw,
  Loader2,
} from "lucide-react";

interface DashboardCard {
  title: string;
  count: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  color: string;
}

export default function AdminDashboard() {
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pages, slides, services, stations, testimonials, stats, partners] = await Promise.all([
        fetch("/api/pages").then(r => r.json()),
        fetch("/api/hero-slides").then(r => r.json()),
        fetch("/api/services").then(r => r.json()),
        fetch("/api/stations").then(r => r.json()),
        fetch("/api/testimonials").then(r => r.json()),
        fetch("/api/stats").then(r => r.json()),
        fetch("/api/partners").then(r => r.json()),
      ]);
      setCards([
        { title: "Pages", count: pages.length, icon: Blocks, href: "/admin/pages", color: "bg-blue-500" },
        { title: "Hero Slides", count: slides.length, icon: SlidersHorizontal, href: "/admin/hero", color: "bg-orange-500" },
        { title: "Services", count: services.length, icon: Fuel, href: "/admin/services", color: "bg-emerald-500" },
        { title: "Stations", count: stations.length, icon: MapPin, href: "/admin/stations", color: "bg-violet-500" },
        { title: "Testimonials", count: testimonials.length, icon: MessageSquare, href: "/admin/testimonials", color: "bg-pink-500" },
        { title: "Statistics", count: stats.length, icon: BarChart3, href: "/admin/stats", color: "bg-cyan-500" },
        { title: "Partners", count: partners.length, icon: Handshake, href: "/admin/partners", color: "bg-amber-500" },
      ]);
    } catch (e) {
      console.error("Failed to load dashboard data:", e);
    }
    setLoading(false);
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to re-seed all CMS data to defaults? This cannot be undone.")) {
      await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ siteName: "Jom Rich Energy Ltd.", tagline: "Powering Progress, Fueling the Future", description: "Jom Rich Energy Company Limited is a leading petroleum products distributor in Ghana.", logo: "/images/logo.png", favicon: "/images/favicon.png", email: "info@jomrichenergy.com", phone: "+233 30 000 0000", address: "Accra, Ghana", socialLinks: { facebook: "https://facebook.com/jomrichenergy", twitter: "https://twitter.com/jomrichenergy", instagram: "https://instagram.com/jomrichenergy", linkedin: "https://linkedin.com/company/jomrichenergy" } }) });
      loadData();
    }
  };

  if (loading) return <div className="flex items-center gap-2 text-gray-500 py-12"><Loader2 className="animate-spin" size={20} /> Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-navy to-navy-light rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Jom Rich CMS</h2>
        <p className="text-white/60 mb-6">
          Manage all your website content, pages, and settings from one place.
        </p>
        <div className="flex gap-3">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Blocks size={16} />
            Page Builder
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          >
            <Settings size={16} />
            Site Settings
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:border-orange/20 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-white`}
              >
                <card.icon size={20} />
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-orange transition-colors"
              />
            </div>
            <div className="text-2xl font-bold text-navy">{card.count}</div>
            <div className="text-sm text-gray-500">{card.title}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-bold text-navy mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link
            href="/admin/hero"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center text-orange">
              <SlidersHorizontal size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-navy">Edit Hero Slides</div>
              <div className="text-xs text-gray-400">Update homepage banner</div>
            </div>
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Fuel size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-navy">Manage Services</div>
              <div className="text-xs text-gray-400">Add or edit services</div>
            </div>
          </Link>
          <Link
            href="/admin/stations"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-500">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-sm font-medium text-navy">Manage Stations</div>
              <div className="text-xs text-gray-400">Add or edit station locations</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Reset */}
      <div className="bg-white rounded-xl border border-red-100 p-6">
        <h3 className="font-bold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-sm text-gray-500 mb-4">
          Reset all CMS data back to the original defaults. This will erase all
          your changes.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          <RefreshCw size={14} />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
