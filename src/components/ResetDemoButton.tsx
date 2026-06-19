"use client";

import { useMockData } from "@/lib/context/MockDataContext";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResetDemoButton() {
  const { resetDemo } = useMockData();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleReset = async () => {
    if (confirm("Reset application to clean presentation state (unverified)?")) {
      await resetDemo();
      router.push("/");
      // Force reload to completely clean all hooks and states
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 bg-[#0D3D28]/95 hover:bg-[#0D3D28] text-white text-[12px] font-bold py-2.5 px-4 rounded-full shadow-xl border border-emerald-500/25 backdrop-blur-xs transition-all hover:scale-[1.05] active:scale-95 cursor-pointer"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
      title="Reset demo presentation state"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      <span>Reset Demo</span>
    </button>
  );
}
