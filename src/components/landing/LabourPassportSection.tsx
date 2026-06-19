"use client";

import WorkerProfileCard from "../identity/WorkerProfileCard";

export default function LabourPassportSection() {
  return (
    <section className="py-24 bg-teal-50">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        <div className="order-2 md:order-1 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-2xl opacity-30 transform -rotate-6" />
          <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <WorkerProfileCard
              name="Raju Kumar"
              initials="RK"
              role="Delivery Partner"
              sector="Transport & Delivery"
              registeredYear="2021"
              verifications={{
                aadhaar: true,
                eshram: true,
                uan: true,
                digilocker: true
              }}
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Universal Labour Passport</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Your Pramaan Labour Passport is a secure, digital proof of your identity, skills, and work history. It belongs to you, and you decide who can view it.
          </p>
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="bg-teal-200 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
              <span>100% owned by the worker (Self-Sovereign Identity)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-teal-200 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
              <span>Verifiable by potential employers instantly</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-teal-200 text-teal-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</span>
              <span>Accepted by micro-finance institutions for credit</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
