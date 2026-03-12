import { prisma } from "./prisma";
import {
  defaultSiteSettings,
  defaultHeroSlides,
  defaultServices,
  defaultStats,
  defaultTestimonials,
  defaultNavItems,
  defaultFooterColumns,
  defaultStations,
} from "./cms-data";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!settings) return defaultSiteSettings;
    return {
      siteName: settings.siteName,
      tagline: settings.tagline,
      description: settings.description,
      logo: settings.logo,
      favicon: settings.favicon,
      email: settings.email,
      phone: settings.phone,
      address: settings.address,
      socialLinks: (settings.socialLinks as Record<string, string>) ?? {},
    };
  } catch {
    return defaultSiteSettings;
  }
}

export async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
    if (slides.length === 0) return defaultHeroSlides;
    return slides.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      description: s.description,
      image: s.image,
      ctaText: s.ctaText,
      ctaLink: s.ctaLink,
      secondaryCtaText: s.secondaryCtaText ?? undefined,
      secondaryCtaLink: s.secondaryCtaLink ?? undefined,
    }));
  } catch {
    return defaultHeroSlides;
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    if (services.length === 0) return defaultServices;
    return services.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      icon: s.icon,
      features: (s.features as string[]) ?? [],
    }));
  } catch {
    return defaultServices;
  }
}

export async function getStats() {
  try {
    const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
    if (stats.length === 0) return defaultStats;
    return stats.map((s) => ({
      id: s.id,
      value: s.value,
      label: s.label,
      suffix: s.suffix ?? undefined,
    }));
  } catch {
    return defaultStats;
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    if (testimonials.length === 0) return defaultTestimonials;
    return testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      quote: t.quote,
      rating: t.rating,
      image: t.image ?? undefined,
    }));
  } catch {
    return defaultTestimonials;
  }
}

export async function getNavItems() {
  try {
    const items = await prisma.navItem.findMany({
      where: { parentId: null },
      include: { children: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    if (items.length === 0) return defaultNavItems;
    return items.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      children: item.children.length > 0
        ? item.children.map((c) => ({ id: c.id, label: c.label, href: c.href }))
        : undefined,
    }));
  } catch {
    return defaultNavItems;
  }
}

export async function getFooterColumns() {
  try {
    const columns = await prisma.footerColumn.findMany({ orderBy: { order: "asc" } });
    if (columns.length === 0) return defaultFooterColumns;
    return columns.map((c) => ({
      id: c.id,
      title: c.title,
      links: (c.links as { label: string; href: string }[]) ?? [],
    }));
  } catch {
    return defaultFooterColumns;
  }
}

export async function getStations() {
  try {
    const stations = await prisma.station.findMany({ orderBy: { order: "asc" } });
    if (stations.length === 0) return defaultStations;
    return stations.map((s) => ({
      id: s.id,
      name: s.name,
      address: s.address,
      city: s.city,
      region: s.region,
      services: (s.services as string[]) ?? [],
      hours: s.hours,
      phone: s.phone ?? undefined,
      lat: s.lat ?? undefined,
      lng: s.lng ?? undefined,
    }));
  } catch {
    return defaultStations;
  }
}

export async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
    if (partners.length === 0) return [
      { id: "1", name: "Shell", logo: "" },
      { id: "2", name: "VIVO Energy", logo: "" },
      { id: "3", name: "TotalEnergies", logo: "" },
      { id: "4", name: "GOIL", logo: "" },
    ];
    return partners.map((p) => ({
      id: p.id,
      name: p.name,
      logo: p.logo,
    }));
  } catch {
    return [
      { id: "1", name: "Shell", logo: "" },
      { id: "2", name: "VIVO Energy", logo: "" },
      { id: "3", name: "TotalEnergies", logo: "" },
      { id: "4", name: "GOIL", logo: "" },
    ];
  }
}

export async function getPages() {
  try {
    return await prisma.page.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export async function getPageById(id: string) {
  try {
    return await prisma.page.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
