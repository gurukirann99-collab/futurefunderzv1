"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function IntentPage() {
  const params = useSearchParams();
  const goal = params.get("goal");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            What would you like to do?
          </h1>
          <p className="text-sm text-gray-600">
            We’ll guide you step by step.
          </p>
        </div>

        {/* 🎓 CAREER */}
        {goal === "career" && (
          <div className="space-y-4">
            <IntentCard
              href="/career/discovery"
              title="Get career clarity"
              desc="Understand which paths suit you right now"
              icon="🎯"
            />
            <IntentCard
              href="/learning/courses"
              title="Start learning skills"
              desc="Build foundations before moving to work"
              icon="📘"
            />
          </div>
        )}

        {/* 📘 LEARNING */}
        {goal === "learning" && (
          <div className="space-y-4">
            <IntentCard
              href="/learning/courses"
              title="Explore courses"
              desc="Learn foundational skills step by step"
              icon="📘"
            />
            <IntentCard
              href="/learning/progress"
              title="View learning progress"
              desc="Continue where you left off"
              icon="📊"
            />
          </div>
        )}

        {/* 💼 WORK */}
        {goal === "work" && (
          <div className="space-y-4">
            <IntentCard
              href="/work/projects"
              title="Practice with projects"
              desc="Apply skills through guided practice"
              icon="🛠"
            />
            <IntentCard
              href="/work/internships"
              title="Find internships"
              desc="Gain real-world experience"
              icon="🧑‍💼"
            />
            <IntentCard
              href="/work/jobs"
              title="Apply for jobs"
              desc="Explore entry-level opportunities"
              icon="💼"
            />
          </div>
        )}

        {/* 🤔 FALLBACK */}
        {!goal && (
          <div className="space-y-4">
            <IntentCard
              href="/confused"
              title="I’m not sure yet"
              desc="Get guided help to decide"
              icon="🤔"
            />
            <Link
              href="/explore"
              className="block text-center text-sm text-gray-500 underline"
            >
              ← Back to explore
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔹 Reusable Card */
function IntentCard({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="block border rounded-lg p-4 hover:border-blue-500 hover:shadow transition"
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </Link>
  );
}
