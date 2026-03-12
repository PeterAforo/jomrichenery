import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import ServicesSection from "@/components/sections/Services";
import StatsSection from "@/components/sections/Stats";
import TestimonialsSection from "@/components/sections/Testimonials";
import PartnersSection from "@/components/sections/Partners";
import CTASection from "@/components/sections/CTA";
import {
  getSiteSettings,
  getHeroSlides,
  getServices,
  getStats,
  getTestimonials,
  getPartners,
  getNavItems,
  getFooterColumns,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, heroSlides, services, stats, testimonials, partners, navItems, footerColumns] =
    await Promise.all([
      getSiteSettings(),
      getHeroSlides(),
      getServices(),
      getStats(),
      getTestimonials(),
      getPartners(),
      getNavItems(),
      getFooterColumns(),
    ]);

  return (
    <>
      <Navbar navItems={navItems} settings={settings} />
      <main>
        <Hero slides={heroSlides} />
        <AboutSection />
        <ServicesSection services={services} />
        <StatsSection stats={stats} />
        <TestimonialsSection testimonials={testimonials} />
        <PartnersSection partners={partners} />
        <CTASection />
      </main>
      <Footer settings={settings} columns={footerColumns} />
    </>
  );
}
