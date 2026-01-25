"use client";

import { useRouter } from "next/navigation";

export default function ConfusedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Feeling confused?
        </h1>

        <p className="text-sm text-[var(--muted)]">
          You’re not alone. Many people feel unsure about what to do next.
          We’ll help you figure it out step by step.
        </p>

        <button
          onClick={() => router.push("/career/discovery")}
          className="w-full bg-[var(--primary)] text-white rounded p-4 hover:opacity-90"
        >
          Let’s figure this out together
        </button>

        <p className="text-xs text-[var(--muted)]">
          No pressure. No wrong answers.
        </p>
      </div>
    </div>
  );
}
