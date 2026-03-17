import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jomrichenergy.com"),
  title: {
    default: "Jom Rich Energy Ltd. | Powering Progress. | Petroleum Distribution Ghana",
    template: "%s | Jom Rich Energy Ltd.",
  },
  description:
    "Jom Rich Energy Company Limited provides integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana with uncompromising standards of safety, quality, and integrity. Located in Tema, serving all of Ghana.",
  keywords: [
    "Jom Rich Energy",
    "Jom Rich Energy Ghana",
    "Jom Rich Energy Ltd",
    "Jom Rich Energy Company Limited",
    "petroleum distribution Ghana",
    "fuel distribution Ghana",
    "fuel automation Ghana",
    "oil and gas services Ghana",
    "bulk petroleum Ghana",
    "energy company Ghana",
    "fuel station Ghana",
    "Tema fuel station",
    "petroleum products Ghana",
    "downstream petroleum Ghana",
    "oil marketing company Ghana",
    "OMC Ghana",
    "LPG supply Ghana",
    "lubricants Ghana",
    "fuel retail Ghana",
    "Powering Progress",
    "Mcaforo project",
    "Mcaforo portfolio",
    "developed by Mcaforo",
  ],
  authors: [
    { name: "Jom Rich Energy Ltd." },
    { name: "Mcaforo", url: "https://www.mcaforo.com" },
  ],
  creator: "Mcaforo",
  publisher: "Jom Rich Energy Ltd.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Jom Rich Energy Ltd. | Powering Progress.",
    description:
      "Integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana.",
    images: ["/images/logo.png"],
    type: "website",
    siteName: "Jom Rich Energy Ltd.",
    locale: "en_GH",
    url: "https://jomrichenergy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jom Rich Energy Ltd. | Powering Progress.",
    description:
      "Integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "https://jomrichenergy.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_CODE",
  },
  other: {
    "developer": "Mcaforo",
    "developer-url": "https://www.mcaforo.com",
    "geo.region": "GH",
    "geo.placename": "Tema",
    "geo.position": "5.6698;-0.0166",
    "ICBM": "5.6698, -0.0166",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Jom Rich Energy Ltd.",
              alternateName: ["Jom Rich Energy", "Jom Rich Energy Company Limited", "JRECL"],
              url: "https://jomrichenergy.com",
              logo: "https://jomrichenergy.com/images/logo.png",
              image: "https://jomrichenergy.com/images/logo.png",
              description:
                "Jom Rich Energy Company Limited provides integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana with uncompromising standards of safety, quality, and integrity.",
              slogan: "Powering Progress.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "FL25, Golf City Main Street",
                addressLocality: "Tema",
                addressRegion: "Greater Accra",
                addressCountry: "GH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 5.6698,
                longitude: -0.0166,
              },
              telephone: "+233303324081",
              email: "info@jomrichenergy.com",
              foundingLocation: {
                "@type": "Place",
                name: "Tema, Ghana",
              },
              areaServed: {
                "@type": "Country",
                name: "Ghana",
              },
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 50,
              },
              sameAs: [
                "https://facebook.com/jomrichenergy",
                "https://twitter.com/jomrichenergy",
                "https://instagram.com/jomrichenergy",
                "https://linkedin.com/company/jomrichenergy",
              ],
              member: {
                "@type": "Person",
                name: "Isaac Abanga",
                jobTitle: "Chief Executive Officer",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://jomrichenergy.com/#localbusiness",
              name: "Jom Rich Energy Ltd.",
              image: "https://jomrichenergy.com/images/logo.png",
              url: "https://jomrichenergy.com",
              telephone: "+233303324081",
              email: "info@jomrichenergy.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "FL25, Golf City Main Street",
                addressLocality: "Tema",
                addressRegion: "Greater Accra",
                addressCountry: "GH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 5.6698,
                longitude: -0.0166,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              priceRange: "$$",
              currenciesAccepted: "GHS",
              paymentAccepted: "Cash, Mobile Money, Bank Transfer",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Petroleum Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Bulk Fuel Distribution",
                      description: "Reliable bulk petroleum product distribution across Ghana.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fuel Automation Systems",
                      description: "Modern fuel automation and monitoring technology for stations.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Retail Fuel Stations",
                      description: "Quality fuel retail stations across Ghana.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "LPG Supply",
                      description: "Liquefied petroleum gas supply for homes and businesses.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Lubricants",
                      description: "Premium lubricants for automotive and industrial applications.",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Jom Rich Energy Ltd.",
              url: "https://jomrichenergy.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://jomrichenergy.com/stations?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              creator: {
                "@type": "Organization",
                name: "Mcaforo",
                url: "https://www.mcaforo.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://jomrichenergy.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About",
                  item: "https://jomrichenergy.com/about",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Services",
                  item: "https://jomrichenergy.com/services",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Stations",
                  item: "https://jomrichenergy.com/stations",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Contact",
                  item: "https://jomrichenergy.com/contact",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
