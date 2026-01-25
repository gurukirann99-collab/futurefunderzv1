"use client";

import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">Explore FutureFunderz</h1>

        <p className="text-sm text-gray-600">
          Tell us what you’re here for. We’ll guide you step by step.
        </p>

        <div className="space-y-4 text-left">
          {/* 🎓 CAREER */}
          <button
            onClick={() => router.push("/intent?goal=career")}
            className="w-full border rounded p-4 hover:bg-gray-100"
          >
            <div className="font-medium">🎓 Build my career</div>
            <p className="text-sm text-gray-500">
              I want clarity, direction, and a long-term path
            </p>
          </button>

          {/* 📘 LEARNING */}
          <button
            onClick={() => router.push("/intent?goal=learning")}
            className="w-full border rounded p-4 hover:bg-gray-100"
          >
            <div className="font-medium">📘 Start learning</div>
            <p className="text-sm text-gray-500">
              I want to learn skills right now
            </p>
          </button>

          {/* 💼 WORK */}
          <button
            onClick={() => router.push("/intent?goal=work")}
            className="w-full border rounded p-4 hover:bg-gray-100"
          >
            <div className="font-medium">💼 Find work</div>
            <p className="text-sm text-gray-500">
              I’m looking for projects, internships, or jobs
            </p>
          </button>

          {/* 🤔 CONFUSED */}
          <button
            onClick={() => router.push("/confused")}
            className="w-full border rounded p-4 hover:bg-gray-100"
          >
            <div className="font-medium">🤔 I’m confused</div>
            <p className="text-sm text-gray-500">
              I don’t know what to do next
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
