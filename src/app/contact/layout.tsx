import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Jom Rich Energy Ltd. - Get in Touch Today",
  description:
    "Contact Jom Rich Energy Company Limited for petroleum distribution, fuel automation, and energy solutions in Ghana. Visit us at FL25, Golf City Main Street, Tema or call +233 303 324 081.",
  keywords: [
    "contact Jom Rich Energy",
    "petroleum distributor contact Ghana",
    "fuel supply Ghana contact",
    "Jom Rich Energy phone number",
    "Jom Rich Energy address Tema",
    "energy company contact Ghana",
    "bulk fuel order Ghana",
    "petroleum quote Ghana",
  ],
  openGraph: {
    title: "Contact Jom Rich Energy Ltd.",
    description:
      "Get in touch with Jom Rich Energy for petroleum distribution and energy solutions in Ghana. FL25, Golf City Main Street, Tema.",
    images: ["/images/logo.png"],
    type: "website",
    url: "https://jomrichenergy.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jom Rich Energy Ltd.",
    description:
      "Get in touch with Jom Rich Energy for petroleum distribution and energy solutions in Ghana.",
  },
  alternates: {
    canonical: "https://jomrichenergy.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
