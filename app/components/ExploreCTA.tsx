"use client";

import { useRouter } from "next/navigation";

export default function ExploreCTA({
  label,
  intent,
}: {
  label: string;
  intent: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem("intent", intent);
    router.push("/auth/login");
  };

  return (
    <div className="mt-12 text-center">
      <button
        onClick={handleClick}
        className="bg-[var(--primary)] text-white px-8 py-3 rounded-xl font-medium hover:opacity-90"
      >
        {label} →
      </button>
    </div>
  );
}
