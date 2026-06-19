import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MockDataProvider } from "@/lib/context/MockDataContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pranam — Portable Reputation Credential for India's Gig Workers",
  description:
    "Pranam helps gig workers, delivery partners, and drivers build a verified digital reputation and portable trust passport through eShram and DigiLocker integrations.",
  keywords: ["fintech", "identity", "gig workers", "India", "DigiLocker", "eShram", "SSI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-white font-sans text-[#111827]">
        <MockDataProvider>
          {children}
        </MockDataProvider>
      </body>
    </html>
  );
}
