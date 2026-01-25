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
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={goBack}
      className="text-sm text-[var(--primary)] hover:underline"
    >
      {label}
    </button>
  );
}
