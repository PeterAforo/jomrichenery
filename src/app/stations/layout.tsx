import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Stations | Jom Rich Energy Ltd. - Find Fuel Stations in Ghana",
  description:
    "Find a Jom Rich Energy fuel station near you. Quality petroleum products, competitive prices, and exceptional service at every location across Ghana including Accra, Tema, Kumasi, and more.",
  keywords: [
    "fuel stations Ghana",
    "petrol station near me Ghana",
    "Jom Rich Energy stations",
    "fuel station Tema",
    "fuel station Accra",
    "petroleum station Ghana",
    "gas station Ghana",
    "filling station Ghana",
    "Jom Rich fuel locations",
    "best fuel station Ghana",
  ],
  openGraph: {
    title: "Our Stations | Jom Rich Energy Ltd.",
    description:
      "Find a Jom Rich Energy fuel station near you across Ghana. Quality fuel and exceptional service at every location.",
    images: ["/images/logo.png"],
    type: "website",
    url: "https://jomrichenergy.com/stations",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jom Rich Energy Stations",
    description:
      "Find a Jom Rich Energy fuel station near you across Ghana.",
  },
  alternates: {
    canonical: "https://jomrichenergy.com/stations",
  },
};

export default function StationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
