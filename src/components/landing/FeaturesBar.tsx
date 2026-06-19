"use client";

import { Shield, Wallet, Star } from "lucide-react";

export default function FeaturesBar() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Identity Verified</h3>
            <p className="text-slate-600 leading-relaxed">
              Link your government IDs safely using DigiLocker and eShram to establish a verified base.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
              <Wallet className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Financial Trust</h3>
            <p className="text-slate-600 leading-relaxed">
              Connect your bank account via Account Aggregator to prove your earning history securely.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Portable Reputation</h3>
            <p className="text-slate-600 leading-relaxed">
              Take your rating with you. Whether you deliver for Zomato or drive for Uber, your trust score is yours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
