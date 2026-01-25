"use client";

import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full space-y-6 text-center bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Explore FutureFunderz
        </h1>

        <p className="text-sm text-[var(--muted)]">
          Tell us what you’re here for. We’ll guide you step by step.
        </p>

        <div className="space-y-4 text-left">
          {[
            {
              label: "🎓 Build my career",
              desc: "I want clarity, direction, and a long-term path",
              href: "/intent?goal=career",
            },
            {
              label: "📘 Start learning",
              desc: "I want to learn skills right now",
              href: "/intent?goal=learning",
            },
            {
              label: "💼 Find work",
              desc: "I’m looking for projects, internships, or jobs",
              href: "/intent?goal=work",
            },
            {
              label: "🤔 I’m confused",
              desc: "I don’t know what to do next",
              href: "/confused",
            },
          ].map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className="w-full border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg)] transition"
            >
              <div className="font-medium text-[var(--text)]">
                {item.label}
              </div>
              <p className="text-sm text-[var(--muted)]">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
