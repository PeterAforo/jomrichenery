"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Image as ImageIcon,
  Fuel,
  MapPin,
  MessageSquare,
  Users,
  Menu,
  X,
  ChevronRight,
  Blocks,
  Navigation,
  BarChart3,
  Handshake,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Page Builder",
    href: "/admin/pages",
    icon: Blocks,
  },
  {
    label: "Hero Slides",
    href: "/admin/hero",
    icon: SlidersHorizontal,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Fuel,
  },
  {
    label: "Stations",
    href: "/admin/stations",
    icon: MapPin,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    label: "Stats",
    href: "/admin/stats",
    icon: BarChart3,
  },
  {
    label: "Partners",
    href: "/admin/partners",
    icon: Handshake,
  },
  {
    label: "Navigation",
    href: "/admin/navigation",
    icon: Navigation,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-navy-dark text-white transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <Image
                src="/images/favicon.png"
                alt="JR"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <div>
                <div className="font-bold text-sm">Jom Rich CMS</div>
                <div className="text-[10px] text-white/40">Content Manager</div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {sidebarItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-orange text-white shadow-lg shadow-orange/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight size={14} />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all"
            >
              <LogOut size={16} />
              Back to Website
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-navy"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-navy">
                {sidebarItems.find(
                  (item) =>
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href))
                )?.label || "Dashboard"}
              </h1>
              <p className="text-xs text-gray-400">
                Manage your website content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-orange transition-colors"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
