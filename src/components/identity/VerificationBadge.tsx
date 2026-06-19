import { Check } from "lucide-react";

interface VerificationBadgeProps {
  label: string;
  colorScheme: 'blue' | 'purple' | 'teal';
}

export default function VerificationBadge({ label, colorScheme }: VerificationBadgeProps) {
  const colorStyles = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    teal: "bg-teal-50 border-teal-200 text-teal-700",
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${colorStyles[colorScheme]}`}>
      <Check className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}
