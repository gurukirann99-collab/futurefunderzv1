"use client";

import { useRouter } from "next/navigation";

export default function ConfusedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full space-y-6 text-center bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Not sure what to do next?</h1>

        <p className="text-sm text-[var(--muted)]">
          That’s okay. We’ll help you get clarity step by step.
        </p>

        <button
          onClick={() => router.push("/guidance/explore")}
          className="w-full bg-[var(--primary)] text-white rounded-xl p-4 hover:opacity-90"
        >
          Start gently
        </button>

        <button
          onClick={() => router.push("/mentors")}
          className="w-full border border-[var(--border)] rounded-xl p-4"
        >
          Talk to a mentor
        </button>
      </div>
    </div>
  );
}
