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
  title: "Jom Rich Energy Ltd. | Powering Progress, Fueling the Future",
  description:
    "Jom Rich Energy Company Limited is a leading petroleum products distributor in Ghana, providing quality fuel and energy solutions to businesses and consumers.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Jom Rich Energy Ltd.",
    description:
      "Leading petroleum products distributor in Ghana. Premium fuel, LPG, lubricants, and energy solutions.",
    images: ["/images/logo.png"],
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
