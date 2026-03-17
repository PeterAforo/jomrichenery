import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Jom Rich Energy Ltd. - Petroleum & Energy Solutions Ghana",
  description:
    "Explore Jom Rich Energy's comprehensive petroleum services: bulk fuel distribution, retail fuel stations, LPG supply, lubricants, fuel automation systems, and convenience stores across Ghana.",
  keywords: [
    "petroleum services Ghana",
    "bulk fuel distribution",
    "fuel stations Ghana",
    "LPG supply Ghana",
    "lubricants distributor Ghana",
    "fuel automation systems",
    "petroleum distribution Tema",
    "Jom Rich Energy services",
    "oil marketing company Ghana",
    "downstream petroleum services",
  ],
  openGraph: {
    title: "Our Services | Jom Rich Energy Ltd.",
    description:
      "Comprehensive petroleum services: bulk fuel distribution, retail stations, LPG, lubricants, and fuel automation systems across Ghana.",
    images: ["/images/logo.png"],
    type: "website",
    url: "https://jomrichenergy.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jom Rich Energy Services",
    description:
      "Bulk fuel distribution, retail stations, LPG, lubricants, and fuel automation systems across Ghana.",
  },
  alternates: {
    canonical: "https://jomrichenergy.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
