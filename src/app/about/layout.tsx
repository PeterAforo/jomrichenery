import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Jom Rich Energy Ltd. - Our Story, Mission & Leadership",
  description:
    "Learn about Jom Rich Energy Company Limited — Ghana's trusted petroleum distributor. Discover our mission to provide integrated oil and gas services, our vision for Africa's industrial transformation, and meet our experienced leadership team led by CEO Isaac Abanga.",
  keywords: [
    "Jom Rich Energy about",
    "petroleum company Ghana",
    "Isaac Abanga CEO",
    "oil and gas Ghana",
    "energy company Tema",
    "bulk petroleum distribution",
    "fuel automation Ghana",
    "downstream petroleum Ghana",
    "Jom Rich Energy leadership",
    "Jom Rich Energy mission vision",
  ],
  openGraph: {
    title: "About Jom Rich Energy Ltd. | Our Story & Leadership",
    description:
      "Discover Jom Rich Energy — integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation in Ghana.",
    images: ["/images/logo.png"],
    type: "website",
    url: "https://jomrichenergy.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jom Rich Energy Ltd.",
    description:
      "Discover Jom Rich Energy — integrated oil and gas services, bulk petroleum distribution in Ghana.",
  },
  alternates: {
    canonical: "https://jomrichenergy.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
