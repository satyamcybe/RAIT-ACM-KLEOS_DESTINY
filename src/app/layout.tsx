import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MockDataProvider } from "@/lib/context/MockDataContext";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PRAMAAN — Portable Reputation Credential for India's Gig Workers",
  description:
    "PRAMAAN helps gig workers, delivery partners, and drivers build a verified digital reputation and portable trust passport through eShram and DigiLocker integrations.",
  keywords: ["fintech", "identity", "gig workers", "India", "DigiLocker", "eShram", "SSI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-white font-sans text-[#111827]">
        <MockDataProvider>
          {children}

        </MockDataProvider>
      </body>
    </html>
  );
}
