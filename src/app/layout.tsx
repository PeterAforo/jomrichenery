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
  title: "Jom Rich Energy Ltd. | Powering Progress.",
  description:
    "Jom Rich Energy Company Limited provides integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems with uncompromising standards of safety, quality, and integrity.",
  keywords: [
    "Jom Rich Energy",
    "petroleum distribution Ghana",
    "fuel automation",
    "oil and gas services",
    "bulk petroleum",
    "energy Ghana",
    "Tema fuel station",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Jom Rich Energy Ltd. | Powering Progress.",
    description:
      "Integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana.",
    images: ["/images/logo.png"],
  },
  other: {
    "developer": "Mcaforo",
    "developer-url": "https://www.mcaforo.com",
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
              url: "https://jomrichenergy.com",
              logo: "https://jomrichenergy.com/images/logo.png",
              description:
                "Integrated oil and gas services, bulk petroleum distribution, and innovative fuel automation systems in Ghana.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "FL25, Golf City Main Street",
                addressLocality: "Tema",
                addressCountry: "GH",
              },
              telephone: "+233 303 324 081",
              email: "info@jomrichenergy.com",
              founder: {
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
              "@type": "WebSite",
              name: "Jom Rich Energy Ltd.",
              url: "https://jomrichenergy.com",
              creator: {
                "@type": "Organization",
                name: "Mcaforo",
                url: "https://www.mcaforo.com",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
