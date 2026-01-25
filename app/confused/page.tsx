"use client";

import { useRouter } from "next/navigation";

export default function ConfusedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold">Feeling confused?</h1>

        <p className="text-sm text-gray-600">
          You’re not alone. Many people feel unsure about what to do next.
          We’ll help you figure it out step by step.
        </p>

        <button
          onClick={() => router.push("/career/discovery")}
          className="w-full bg-blue-600 text-white rounded p-4 hover:bg-blue-700"
        >
          Let’s figure this out together
        </button>

        <p className="text-xs text-gray-400">
          No pressure. No wrong answers.
        </p>
      </div>
    </div>
  );
}
