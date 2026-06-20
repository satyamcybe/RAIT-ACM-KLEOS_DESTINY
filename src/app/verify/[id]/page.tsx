import { prisma } from "@/lib/database/prisma";
import { notFound } from "next/navigation";

export default async function VerifyCredentialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const credential = await prisma.credential.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!credential) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center border-t-4 border-red-500">
          <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">INVALID ✗</h1>
          <p className="text-gray-600 mb-8">This credential does not exist or has been revoked.</p>
          <div className="text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-3">
            Powered by Pramaan | Verified via e-Shram + AA Framework
          </div>
        </div>
      </div>
    );
  }

  const subject = credential.subject as any;
  const claims = credential.claims as any;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-3xl space-y-8">
        
        {/* PRAMAAN Logo Header */}
        <div className="flex justify-center mb-2">
          <img 
            src="/logo-text.png" 
            alt="PRAMAAN Logo" 
            className="h-12 w-auto object-contain mix-blend-multiply logo-brand-green"
          />
        </div>
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-green-50 px-8 py-6 border-b border-green-100 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Gig Worker Credential</h1>
              <p className="text-sm text-gray-600">ID: {credential.id}</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              VALID ✓
            </div>
          </div>
          
          <div className="px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{subject.name}</h2>
              <p className="text-lg text-gray-600 font-medium">{subject.platform}</p>
              <p className="text-sm text-gray-500 mt-1">Issued: {new Date(credential.issuedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 text-center min-w-[200px] border border-blue-100">
              <div className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-1">Pramaan Score</div>
              <div className="text-5xl font-extrabold text-blue-700">{claims.pramanScore}</div>
              <div className="text-xs text-blue-500 mt-2">out of 1000</div>
            </div>
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Verified Claims</h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Tenure</span>
              <span className="text-base text-gray-900 sm:w-2/3 font-medium">{claims.tenureMonths} Months</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Consistency</span>
              <span className="text-base text-gray-900 sm:w-2/3 font-medium">{claims.consistencyPct}%</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Avg Monthly Income</span>
              <span className="text-base text-gray-900 sm:w-2/3 font-medium">₹{Math.round(claims.avgMonthlyIncome).toLocaleString('en-IN')}</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Est. Deliveries</span>
              <span className="text-base text-gray-900 sm:w-2/3 font-medium">{claims.estDeliveriesRange}</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Income Trend</span>
              <span className="text-base text-gray-900 sm:w-2/3 font-medium capitalize">{claims.incomeTrend}</span>
            </div>
          </div>
        </div>

        {/* Verification Source */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Verification Source</h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Identity</span>
              <span className="text-sm text-gray-900 sm:w-2/3">{subject.identityVerifiedBy}</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Platform</span>
              <span className="text-sm text-gray-900 sm:w-2/3">{subject.platformVerifiedBy}</span>
            </div>
            <div className="px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-sm font-medium text-gray-500 w-1/3">Financial</span>
              <span className="text-sm text-gray-900 sm:w-2/3">{claims.dataSource}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 pt-4 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-500">
            Powered by Pramaan | Verified via e-Shram + AA Framework
          </p>
        </div>

      </div>
    </div>
  );
}
