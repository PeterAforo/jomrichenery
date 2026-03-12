import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("🌱 Seeding database...");

  // Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Jom Rich Energy Ltd.",
      tagline: "Powering Progress, Fueling the Future",
      description:
        "Jom Rich Energy Company Limited is a leading petroleum products distributor in Ghana, providing quality fuel and energy solutions to businesses and consumers.",
      logo: "/images/logo.png",
      favicon: "/images/favicon.png",
      email: "info@jomrichenergy.com",
      phone: "+233 30 000 0000",
      address: "Accra, Ghana",
      socialLinks: {
        facebook: "https://facebook.com/jomrichenergy",
        twitter: "https://twitter.com/jomrichenergy",
        instagram: "https://instagram.com/jomrichenergy",
        linkedin: "https://linkedin.com/company/jomrichenergy",
      },
    },
  });
  console.log("  ✅ Site Settings");

  // Hero Slides
  const heroSlides = [
    {
      title: "Powering Ghana's Future",
      subtitle: "Premium Petroleum Products",
      description:
        "Delivering quality fuel solutions with reliability and excellence across the nation. Your trusted energy partner.",
      image: "/images/3.jpeg",
      ctaText: "Our Services",
      ctaLink: "/services",
      secondaryCtaText: "Contact Us",
      secondaryCtaLink: "/contact",
      order: 0,
    },
    {
      title: "Reliable Energy Solutions",
      subtitle: "Nationwide Distribution",
      description:
        "From petrol and diesel to LPG, we deliver premium petroleum products to fuel your business and daily life.",
      image: "/images/1.jpeg",
      ctaText: "Find a Station",
      ctaLink: "/stations",
      secondaryCtaText: "Learn More",
      secondaryCtaLink: "/about",
      order: 1,
    },
    {
      title: "Excellence in Service",
      subtitle: "Trusted by Thousands",
      description:
        "Our dedicated team ensures top-quality service at every station, every day. Experience the Jom Rich difference.",
      image: "/images/2.jpeg",
      ctaText: "About Us",
      ctaLink: "/about",
      secondaryCtaText: "Our Team",
      secondaryCtaLink: "/about#team",
      order: 2,
    },
  ];
  await prisma.heroSlide.deleteMany();
  for (const slide of heroSlides) {
    await prisma.heroSlide.create({ data: slide });
  }
  console.log("  ✅ Hero Slides");

  // Services
  const services = [
    {
      title: "Fuel Distribution",
      description:
        "We distribute premium-grade petrol and diesel across Ghana through our network of modern fuel stations.",
      icon: "Fuel",
      features: ["Premium Motor Spirit (PMS)", "Automotive Gas Oil (AGO)", "Quality assurance at every pump", "Competitive pricing"],
      order: 0,
    },
    {
      title: "Lubricants & Oils",
      description:
        "High-performance lubricants and motor oils for all vehicle types, from personal cars to heavy-duty commercial fleets.",
      icon: "Droplets",
      features: ["Engine oils", "Transmission fluids", "Hydraulic oils", "Industrial lubricants"],
      order: 1,
    },
    {
      title: "LPG Supply",
      description:
        "Safe and reliable Liquefied Petroleum Gas supply for domestic cooking, commercial kitchens, and industrial applications.",
      icon: "Flame",
      features: ["Domestic cylinders", "Commercial bulk supply", "Safety-certified equipment", "Doorstep delivery"],
      order: 2,
    },
    {
      title: "Bulk Fuel Supply",
      description:
        "Dedicated bulk fuel supply services for mining operations, construction sites, transport fleets, and large-scale industrial consumers.",
      icon: "Truck",
      features: ["Fleet fueling", "Mining operations", "Construction sites", "Industrial consumers"],
      order: 3,
    },
    {
      title: "Convenience Stores",
      description:
        "Modern convenience shops at our stations offering snacks, beverages, and everyday essentials for travelers and commuters.",
      icon: "Store",
      features: ["Quick refreshments", "Travel essentials", "ATM services", "Clean restrooms"],
      order: 4,
    },
    {
      title: "Fleet Management",
      description:
        "Comprehensive fleet fueling and management solutions with detailed reporting, dedicated account management, and volume discounts.",
      icon: "BarChart3",
      features: ["Fuel cards", "Usage analytics", "Volume discounts", "Dedicated account manager"],
      order: 5,
    },
  ];
  await prisma.service.deleteMany();
  for (const svc of services) {
    await prisma.service.create({ data: svc });
  }
  console.log("  ✅ Services");

  // Stats
  const stats = [
    { value: "50", label: "Fuel Stations", suffix: "+", order: 0 },
    { value: "10", label: "Years Experience", suffix: "+", order: 1 },
    { value: "500", label: "Employees", suffix: "+", order: 2 },
    { value: "1M", label: "Litres Delivered Monthly", suffix: "+", order: 3 },
  ];
  await prisma.stat.deleteMany();
  for (const stat of stats) {
    await prisma.stat.create({ data: stat });
  }
  console.log("  ✅ Stats");

  // Testimonials
  const testimonials = [
    {
      name: "Kwame Asante",
      role: "Fleet Manager",
      company: "Trans-Ghana Logistics",
      quote:
        "Jom Rich Energy has been our primary fuel supplier for 5 years. Their consistency in quality and reliability of supply has kept our fleet running efficiently across the country.",
      rating: 5,
      order: 0,
    },
    {
      name: "Ama Serwaa",
      role: "Business Owner",
      company: "Serwaa Foods Ltd.",
      quote:
        "The LPG supply service from Jom Rich is exceptional. Timely deliveries and competitive pricing have made our restaurant operations seamless.",
      rating: 5,
      order: 1,
    },
    {
      name: "Michael Osei",
      role: "Operations Director",
      company: "GoldStar Mining Co.",
      quote:
        "Their bulk fuel supply for our mining operations is unmatched. Professional service, quality fuel, and they never miss a delivery schedule.",
      rating: 5,
      order: 2,
    },
  ];
  await prisma.testimonial.deleteMany();
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("  ✅ Testimonials");

  // Partners
  const partners = [
    { name: "Shell", logo: "/images/partners/shell.svg", order: 0 },
    { name: "VIVO Energy", logo: "/images/partners/vivo.svg", order: 1 },
    { name: "TotalEnergies", logo: "/images/partners/total.svg", order: 2 },
    { name: "GOIL", logo: "/images/partners/goil.svg", order: 3 },
  ];
  await prisma.partner.deleteMany();
  for (const p of partners) {
    await prisma.partner.create({ data: p });
  }
  console.log("  ✅ Partners");

  // Stations
  const stations = [
    { name: "Jom Rich - Accra Central", address: "23 Independence Ave", city: "Accra", region: "Greater Accra", services: ["Petrol", "Diesel", "LPG", "Convenience Store", "ATM"], hours: "24/7", phone: "+233 30 000 0001", order: 0 },
    { name: "Jom Rich - Kumasi Highway", address: "45 Kumasi Road", city: "Kumasi", region: "Ashanti", services: ["Petrol", "Diesel", "LPG", "Convenience Store"], hours: "24/7", phone: "+233 30 000 0002", order: 1 },
    { name: "Jom Rich - Tema Industrial", address: "12 Industrial Area", city: "Tema", region: "Greater Accra", services: ["Petrol", "Diesel", "Bulk Supply", "Fleet Services"], hours: "6:00 AM - 10:00 PM", phone: "+233 30 000 0003", order: 2 },
    { name: "Jom Rich - Takoradi Port", address: "8 Harbor Road", city: "Takoradi", region: "Western", services: ["Petrol", "Diesel", "LPG", "Convenience Store", "Car Wash"], hours: "24/7", phone: "+233 30 000 0004", order: 3 },
    { name: "Jom Rich - Tamale Central", address: "15 Market Street", city: "Tamale", region: "Northern", services: ["Petrol", "Diesel", "LPG"], hours: "6:00 AM - 10:00 PM", phone: "+233 30 000 0005", order: 4 },
    { name: "Jom Rich - Cape Coast", address: "78 Castle Road", city: "Cape Coast", region: "Central", services: ["Petrol", "Diesel", "Convenience Store"], hours: "6:00 AM - 10:00 PM", phone: "+233 30 000 0006", order: 5 },
  ];
  await prisma.station.deleteMany();
  for (const s of stations) {
    await prisma.station.create({ data: s });
  }
  console.log("  ✅ Stations");

  // Nav Items
  await prisma.navItem.deleteMany();
  const homeNav = await prisma.navItem.create({ data: { label: "Home", href: "/", order: 0 } });
  const aboutNav = await prisma.navItem.create({ data: { label: "About Us", href: "/about", order: 1 } });
  const servicesNav = await prisma.navItem.create({ data: { label: "Services", href: "/services", order: 2 } });
  await prisma.navItem.create({ data: { label: "Fuel Distribution", href: "/services#fuel-distribution", parentId: servicesNav.id, order: 0 } });
  await prisma.navItem.create({ data: { label: "Lubricants", href: "/services#lubricants", parentId: servicesNav.id, order: 1 } });
  await prisma.navItem.create({ data: { label: "LPG Supply", href: "/services#lpg", parentId: servicesNav.id, order: 2 } });
  await prisma.navItem.create({ data: { label: "Bulk Supply", href: "/services#bulk-supply", parentId: servicesNav.id, order: 3 } });
  await prisma.navItem.create({ data: { label: "Our Stations", href: "/stations", order: 3 } });
  await prisma.navItem.create({ data: { label: "Contact", href: "/contact", order: 4 } });
  console.log("  ✅ Navigation");

  // Footer Columns
  await prisma.footerColumn.deleteMany();
  await prisma.footerColumn.create({
    data: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/about#team" },
        { label: "Careers", href: "/careers" },
        { label: "News & Updates", href: "/news" },
      ],
      order: 0,
    },
  });
  await prisma.footerColumn.create({
    data: {
      title: "Services",
      links: [
        { label: "Fuel Distribution", href: "/services#fuel-distribution" },
        { label: "LPG Supply", href: "/services#lpg" },
        { label: "Bulk Supply", href: "/services#bulk-supply" },
        { label: "Fleet Management", href: "/services#fleet-management" },
      ],
      order: 1,
    },
  });
  await prisma.footerColumn.create({
    data: {
      title: "Support",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Find a Station", href: "/stations" },
        { label: "FAQs", href: "/faq" },
        { label: "Safety", href: "/safety" },
      ],
      order: 2,
    },
  });
  console.log("  ✅ Footer Columns");

  // Default Page
  await prisma.page.deleteMany();
  await prisma.page.create({
    data: {
      title: "Home",
      slug: "/",
      description: "Welcome to Jom Rich Energy Ltd.",
      isPublished: true,
      blocks: [],
    },
  });
  console.log("  ✅ Pages");

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
