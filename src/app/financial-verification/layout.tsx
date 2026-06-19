// ===========================================
// PRAMAAN - Financial Verification Layout
// ===========================================

import { Navbar } from "@/components/layout/navbar";

export default function FinancialVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>
    </div>
  );
}
