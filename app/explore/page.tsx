"use client";

import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">Explore FutureFunderz</h1>
        <p className="text-sm text-gray-600">
          Tell us where you’re at. We’ll guide you step by step.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/intent?goal=career")}
            className="w-full border rounded p-4 hover:bg-gray-100 text-left"
          >
            🎓 Build my career
            <p className="text-sm text-gray-500">
              I want clarity and skills for my future
            </p>
          </button>

          <button
            onClick={() => router.push("/intent?goal=work")}
            className="w-full border rounded p-4 hover:bg-gray-100 text-left"
          >
            💼 Find work / opportunities
            <p className="text-sm text-gray-500">
              I want projects, internships, or jobs
            </p>
          </button>

          <button
            onClick={() => router.push("/confused")}
            className="w-full border rounded p-4 hover:bg-gray-100 text-left"
          >
            🤔 I’m confused
            <p className="text-sm text-gray-500">
              I don’t know what to do next
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
