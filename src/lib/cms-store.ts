"use client";

// Client-side CMS Store using localStorage for persistence
// In production, this would connect to a database/API

import {
  SiteSettings,
  NavItem,
  HeroSlide,
  Service,
  Stat,
  Testimonial,
  Partner,
  Station,
  FooterColumn,
  Page,
  PageBlock,
  defaultSiteSettings,
  defaultNavItems,
  defaultHeroSlides,
  defaultServices,
  defaultStats,
  defaultTestimonials,
  defaultPartners,
  defaultStations,
  defaultFooterColumns,
  defaultPages,
} from "./cms-data";

const STORAGE_PREFIX = "jomrich_cms_";

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

// Site Settings
export function getSiteSettings(): SiteSettings {
  return getItem("settings", defaultSiteSettings);
}

export function saveSiteSettings(settings: SiteSettings): void {
  setItem("settings", settings);
}

// Navigation
export function getNavItems(): NavItem[] {
  return getItem("navItems", defaultNavItems);
}

export function saveNavItems(items: NavItem[]): void {
  setItem("navItems", items);
}

// Hero Slides
export function getHeroSlides(): HeroSlide[] {
  return getItem("heroSlides", defaultHeroSlides);
}

export function saveHeroSlides(slides: HeroSlide[]): void {
  setItem("heroSlides", slides);
}

// Services
export function getServices(): Service[] {
  return getItem("services", defaultServices);
}

export function saveServices(services: Service[]): void {
  setItem("services", services);
}

// Stats
export function getStats(): Stat[] {
  return getItem("stats", defaultStats);
}

export function saveStats(stats: Stat[]): void {
  setItem("stats", stats);
}

// Testimonials
export function getTestimonials(): Testimonial[] {
  return getItem("testimonials", defaultTestimonials);
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  setItem("testimonials", testimonials);
}

// Partners
export function getPartners(): Partner[] {
  return getItem("partners", defaultPartners);
}

export function savePartners(partners: Partner[]): void {
  setItem("partners", partners);
}

// Stations
export function getStations(): Station[] {
  return getItem("stations", defaultStations);
}

export function saveStations(stations: Station[]): void {
  setItem("stations", stations);
}

// Footer
export function getFooterColumns(): FooterColumn[] {
  return getItem("footerColumns", defaultFooterColumns);
}

export function saveFooterColumns(columns: FooterColumn[]): void {
  setItem("footerColumns", columns);
}

// Pages (Page Builder)
export function getPages(): Page[] {
  return getItem("pages", defaultPages);
}

export function savePage(page: Page): void {
  const pages = getPages();
  const index = pages.findIndex((p) => p.id === page.id);
  if (index >= 0) {
    pages[index] = { ...page, updatedAt: new Date().toISOString() };
  } else {
    pages.push({ ...page, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  setItem("pages", pages);
}

export function deletePage(pageId: string): void {
  const pages = getPages().filter((p) => p.id !== pageId);
  setItem("pages", pages);
}

export function getPageBySlug(slug: string): Page | undefined {
  return getPages().find((p) => p.slug === slug);
}

// Reset all CMS data to defaults
export function resetCMSData(): void {
  if (typeof window === "undefined") return;
  const keys = [
    "settings",
    "navItems",
    "heroSlides",
    "services",
    "stats",
    "testimonials",
    "partners",
    "stations",
    "footerColumns",
    "pages",
  ];
  keys.forEach((key) => localStorage.removeItem(STORAGE_PREFIX + key));
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
