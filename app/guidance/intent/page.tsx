"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function IntentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const goal = params.get("goal");

  /* ---------- ACTION HANDLER ---------- */
  const go = (href: string) => router.push(href);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-xl shadow p-8 space-y-6 text-[var(--text)]">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            What would you like to do?
          </h1>
          <p className="text-sm text-[var(--muted)]">
            We’ll guide you step by step.
          </p>
        </div>

        {/* 🎓 CAREER */}
        {goal === "career" && (
          <IntentCard
            icon="🎯"
            title="Get career clarity"
            desc="Answer a few questions to find the right direction"
            onClick={() => go("/guidance/discovery")}
          />
        )}

        {/* 📘 LEARNING */}
        {goal === "learning" && (
          <IntentCard
            icon="📘"
            title="Explore courses"
            desc="Start learning skills immediately"
            onClick={() => go("/student/learning/courses")}
          />
        )}

        {/* 💼 WORK */}
        {goal === "work" && (
          <IntentCard
            icon="💼"
            title="Check job readiness"
            desc="We’ll assess your readiness before applying"
            onClick={() => go("/guidance/discovery?from=work")}
          />
        )}

        {/* 🤔 CONFUSED */}
        {goal === "confused" && (
          <IntentCard
            icon="🤍"
            title="Guide me step by step"
            desc="No pressure. We’ll figure this out together."
            onClick={() => go("/guidance/discovery?goal=confused")}
          />
        )}

        {/* SAFETY */}
        {!goal && (
          <button
            onClick={() => go("/guidance/explore")}
            className="text-sm text-[var(--muted)] underline mx-auto block"
          >
            ← Back to explore
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- WRAPPER ---------- */
export default function IntentPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
          Loading...
        </p>
      }
    >
      <IntentContent />
    </Suspense>
  );
}

/* ---------- CARD ---------- */
function IntentCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-[var(--border)] rounded-xl p-4 hover:border-[var(--primary)] hover:shadow transition"
    >
      <div className="flex items-start gap-3">
        <div className="text-xl">{icon}</div>
        <div>
          <div className="font-medium">{title}</div>
          <p className="text-sm text-[var(--muted)]">
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}
