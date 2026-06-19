// ===========================================
// PRANAM - Root Layout
// ===========================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranam — Financial Identity for India's Gig Workers",
  description:
    "Pranam helps gig and informal workers build verifiable financial identities through DigiLocker, eShram, and Account Aggregator integrations.",
  keywords: ["fintech", "identity", "gig workers", "India", "DigiLocker", "eShram", "SSI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-gray-900">
        {/* TODO: Wrap with ClerkProvider when keys are configured */}
        {children}
      </body>
    </html>
  );
}
