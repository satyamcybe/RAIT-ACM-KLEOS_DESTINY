// ===========================================
// PRANAM - Root Layout
// ===========================================

import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pramaan — Verified Digital Reputation and Trust Passport",
  description:
    "Pramaan helps gig workers, delivery partners, and drivers build a verified digital reputation and portable trust passport through eShram and DigiLocker integrations.",
  keywords: ["fintech", "identity", "gig workers", "India", "DigiLocker", "eShram", "SSI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F7F6F2] font-sans text-[#111827]">
        {children}
      </body>
    </html>
  );
}

