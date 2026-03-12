// CMS Data Store - JSON-based CMS for managing all site content
// This serves as the data layer that the admin CMS reads/writes

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image?: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  lat?: number;
  lng?: number;
  services: string[];
  image?: string;
  phone?: string;
  hours: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  id: string;
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  favicon: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface PageBlock {
  id: string;
  type:
    | "hero"
    | "text"
    | "image"
    | "services"
    | "stats"
    | "testimonials"
    | "cta"
    | "team"
    | "partners"
    | "stations"
    | "contact-form"
    | "gallery"
    | "faq"
    | "two-column"
    | "video";
  data: Record<string, unknown>;
  order: number;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  blocks: PageBlock[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Default CMS Data
export const defaultSiteSettings: SiteSettings = {
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
};

export const defaultNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About Us", href: "/about" },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: [
      {
        id: "fuel-distribution",
        label: "Fuel Distribution",
        href: "/services#fuel-distribution",
      },
      {
        id: "lubricants",
        label: "Lubricants",
        href: "/services#lubricants",
      },
      { id: "lpg", label: "LPG Supply", href: "/services#lpg" },
      {
        id: "bulk-supply",
        label: "Bulk Supply",
        href: "/services#bulk-supply",
      },
    ],
  },
  { id: "stations", label: "Our Stations", href: "/stations" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Powering Ghana's Future",
    subtitle: "Premium Petroleum Products",
    description:
      "Delivering quality fuel solutions with reliability and excellence across the nation. Your trusted energy partner.",
    image: "/images/3.jpeg",
    ctaText: "Our Services",
    ctaLink: "/services",
    secondaryCtaText: "Contact Us",
    secondaryCtaLink: "/contact",
  },
  {
    id: "hero-2",
    title: "Reliable Energy Solutions",
    subtitle: "Nationwide Distribution",
    description:
      "From petrol and diesel to LPG, we deliver premium petroleum products to fuel your business and daily life.",
    image: "/images/1.jpeg",
    ctaText: "Find a Station",
    ctaLink: "/stations",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "/about",
  },
  {
    id: "hero-3",
    title: "Excellence in Service",
    subtitle: "Trusted by Thousands",
    description:
      "Our dedicated team ensures top-quality service at every station, every day. Experience the Jom Rich difference.",
    image: "/images/2.jpeg",
    ctaText: "About Us",
    ctaLink: "/about",
    secondaryCtaText: "Our Team",
    secondaryCtaLink: "/about#team",
  },
];

export const defaultServices: Service[] = [
  {
    id: "fuel-distribution",
    title: "Fuel Distribution",
    description:
      "We distribute premium-grade petrol and diesel across Ghana through our network of modern fuel stations, ensuring consistent quality and availability.",
    icon: "Fuel",
    features: [
      "Premium Motor Spirit (PMS)",
      "Automotive Gas Oil (AGO)",
      "Quality assurance at every pump",
      "Competitive pricing",
    ],
  },
  {
    id: "lubricants",
    title: "Lubricants & Oils",
    description:
      "High-performance lubricants and motor oils for all vehicle types, from personal cars to heavy-duty commercial fleets.",
    icon: "Droplets",
    features: [
      "Engine oils",
      "Transmission fluids",
      "Hydraulic oils",
      "Industrial lubricants",
    ],
  },
  {
    id: "lpg",
    title: "LPG Supply",
    description:
      "Safe and reliable Liquefied Petroleum Gas supply for domestic cooking, commercial kitchens, and industrial applications.",
    icon: "Flame",
    features: [
      "Domestic cylinders",
      "Commercial bulk supply",
      "Safety-certified equipment",
      "Doorstep delivery",
    ],
  },
  {
    id: "bulk-supply",
    title: "Bulk Fuel Supply",
    description:
      "Dedicated bulk fuel supply services for mining operations, construction sites, transport fleets, and large-scale industrial consumers.",
    icon: "Truck",
    features: [
      "Fleet fueling",
      "Mining operations",
      "Construction sites",
      "Industrial consumers",
    ],
  },
  {
    id: "convenience",
    title: "Convenience Stores",
    description:
      "Modern convenience shops at our stations offering snacks, beverages, and everyday essentials for travelers and commuters.",
    icon: "Store",
    features: [
      "Quick refreshments",
      "Travel essentials",
      "ATM services",
      "Clean restrooms",
    ],
  },
  {
    id: "fleet-management",
    title: "Fleet Management",
    description:
      "Comprehensive fleet fueling and management solutions with detailed reporting, dedicated account management, and volume discounts.",
    icon: "BarChart3",
    features: [
      "Fuel cards",
      "Usage analytics",
      "Volume discounts",
      "Dedicated account manager",
    ],
  },
];

export const defaultStats: Stat[] = [
  { id: "stat-1", value: "50", label: "Fuel Stations", suffix: "+" },
  { id: "stat-2", value: "10", label: "Years Experience", suffix: "+" },
  { id: "stat-3", value: "500", label: "Employees", suffix: "+" },
  { id: "stat-4", value: "1M", label: "Litres Delivered Monthly", suffix: "+" },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Kwame Asante",
    role: "Fleet Manager",
    company: "Trans-Ghana Logistics",
    quote:
      "Jom Rich Energy has been our primary fuel supplier for 5 years. Their consistency in quality and reliability of supply has kept our fleet running efficiently across the country.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Ama Serwaa",
    role: "Business Owner",
    company: "Serwaa Foods Ltd.",
    quote:
      "The LPG supply service from Jom Rich is exceptional. Timely deliveries and competitive pricing have made our restaurant operations seamless.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Michael Osei",
    role: "Operations Director",
    company: "GoldStar Mining Co.",
    quote:
      "Their bulk fuel supply for our mining operations is unmatched. Professional service, quality fuel, and they never miss a delivery schedule.",
    rating: 5,
  },
];

export const defaultPartners: Partner[] = [
  { id: "partner-1", name: "Shell", logo: "/images/partners/shell.svg" },
  { id: "partner-2", name: "VIVO Energy", logo: "/images/partners/vivo.svg" },
  { id: "partner-3", name: "TotalEnergies", logo: "/images/partners/total.svg" },
  { id: "partner-4", name: "GOIL", logo: "/images/partners/goil.svg" },
];

export const defaultStations: Station[] = [
  {
    id: "station-1",
    name: "Jom Rich - Accra Central",
    address: "23 Independence Ave",
    city: "Accra",
    region: "Greater Accra",
    services: ["Petrol", "Diesel", "LPG", "Convenience Store", "ATM"],
    hours: "24/7",
    phone: "+233 30 000 0001",
  },
  {
    id: "station-2",
    name: "Jom Rich - Kumasi Highway",
    address: "45 Kumasi Road",
    city: "Kumasi",
    region: "Ashanti",
    services: ["Petrol", "Diesel", "LPG", "Convenience Store"],
    hours: "24/7",
    phone: "+233 30 000 0002",
  },
  {
    id: "station-3",
    name: "Jom Rich - Tema Industrial",
    address: "12 Industrial Area",
    city: "Tema",
    region: "Greater Accra",
    services: ["Petrol", "Diesel", "Bulk Supply", "Fleet Services"],
    hours: "6:00 AM - 10:00 PM",
    phone: "+233 30 000 0003",
  },
  {
    id: "station-4",
    name: "Jom Rich - Takoradi Port",
    address: "8 Harbor Road",
    city: "Takoradi",
    region: "Western",
    services: ["Petrol", "Diesel", "LPG", "Convenience Store", "Car Wash"],
    hours: "24/7",
    phone: "+233 30 000 0004",
  },
  {
    id: "station-5",
    name: "Jom Rich - Tamale Central",
    address: "15 Market Street",
    city: "Tamale",
    region: "Northern",
    services: ["Petrol", "Diesel", "LPG"],
    hours: "6:00 AM - 10:00 PM",
    phone: "+233 30 000 0005",
  },
  {
    id: "station-6",
    name: "Jom Rich - Cape Coast",
    address: "78 Castle Road",
    city: "Cape Coast",
    region: "Central",
    services: ["Petrol", "Diesel", "Convenience Store"],
    hours: "6:00 AM - 10:00 PM",
    phone: "+233 30 000 0006",
  },
];

export const defaultFooterColumns: FooterColumn[] = [
  {
    id: "footer-1",
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "News & Updates", href: "/news" },
    ],
  },
  {
    id: "footer-2",
    title: "Services",
    links: [
      { label: "Fuel Distribution", href: "/services#fuel-distribution" },
      { label: "LPG Supply", href: "/services#lpg" },
      { label: "Bulk Supply", href: "/services#bulk-supply" },
      { label: "Fleet Management", href: "/services#fleet-management" },
    ],
  },
  {
    id: "footer-3",
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Find a Station", href: "/stations" },
      { label: "FAQs", href: "/faq" },
      { label: "Safety", href: "/safety" },
    ],
  },
];

export const defaultPages: Page[] = [
  {
    id: "home",
    title: "Home",
    slug: "/",
    description: "Welcome to Jom Rich Energy Ltd.",
    isPublished: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    blocks: [
      {
        id: "home-hero",
        type: "hero",
        data: { slides: defaultHeroSlides },
        order: 0,
      },
      {
        id: "home-services",
        type: "services",
        data: {
          title: "Our Services",
          subtitle: "Comprehensive Energy Solutions",
          services: defaultServices,
        },
        order: 1,
      },
      {
        id: "home-stats",
        type: "stats",
        data: {
          title: "Our Impact in Numbers",
          stats: defaultStats,
        },
        order: 2,
      },
      {
        id: "home-testimonials",
        type: "testimonials",
        data: {
          title: "What Our Clients Say",
          testimonials: defaultTestimonials,
        },
        order: 3,
      },
      {
        id: "home-cta",
        type: "cta",
        data: {
          title: "Ready to Partner With Us?",
          description:
            "Join thousands of satisfied customers who trust Jom Rich Energy for their fuel and energy needs.",
          ctaText: "Get in Touch",
          ctaLink: "/contact",
        },
        order: 4,
      },
    ],
  },
];
