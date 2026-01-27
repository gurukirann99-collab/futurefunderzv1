"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

type BackButtonProps = {
  fallback?: string;
  label?: string;
};

export default function BackButton({
  fallback = "/role",
  label = "← Back",
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Track last REAL page
  useEffect(() => {
    const prev = sessionStorage.getItem("lastPage");

    if (prev !== pathname) {
      sessionStorage.setItem("lastPage", pathname);
    }
  }, [pathname]);

  const goBack = () => {
    const lastPage = sessionStorage.getItem("lastPage");

    // If last page is same as current → loop detected
    if (!lastPage || lastPage === pathname) {
      router.replace(fallback);
      return;
    }

    router.back();
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
