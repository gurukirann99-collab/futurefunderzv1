"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallback?: string;
  label?: string;
};

export default function BackButton({
  fallback = "/dashboard",
  label = "← Back",
}: BackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    // If user has history, go back
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback route
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={goBack}
      className="text-sm text-gray-700 hover:underline"
    >
      {label}
    </button>
  );
}
