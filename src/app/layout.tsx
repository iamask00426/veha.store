import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider, WishlistProvider, ToastProvider } from "@/context";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VEHA SILVER — Premium Handcrafted Jewellery & Watch Marketplace",
  description:
    "Shop premium handcrafted jewellery and exquisite watches. Discover curated collections of rings, necklaces, earrings, bangles, mangalsutra, and luxury timepieces. Free shipping across India.",
  keywords: ["jewellery", "jewelry", "watches", "gold", "diamond", "silver", "India", "online shopping"],
  authors: [{ name: "VEHA SILVER" }],
  openGraph: {
    title: "VEHA SILVER — Premium Jewellery & Watch Marketplace",
    description: "Shop premium handcrafted jewellery and exquisite watches across India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}


