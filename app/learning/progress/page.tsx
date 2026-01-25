"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

// V1 mock learning state
const activeCourse = {
  title: "Web Development Basics",
  completedLessons: 1,
  totalLessons: 4,
};

const PROJECT_LABELS: Record<string, string> = {
  "portfolio-website": "Build a Personal Portfolio Website",
  "landing-page": "Design a Marketing Landing Page",
  "python-script": "Build a Simple Python Automation Script",
};

function LearningProgressContent() {
  const { loading } = useRequireAuth();
  const params = useSearchParams();

  const selectedProjectId = params.get("project");
  const selectedProjectTitle =
    selectedProjectId && PROJECT_LABELS[selectedProjectId];

  const hasStartedCourse = activeCourse.completedLessons > 0;

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading progress...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-xl mx-auto space-y-8 text-[var(--text)]">
        <h1 className="text-2xl font-bold">
          Your Learning Progress
        </h1>

        {/* COURSE STATUS */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-2">
          <h2 className="font-semibold">
            {activeCourse.title}
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Progress: {activeCourse.completedLessons} /{" "}
            {activeCourse.totalLessons} lessons
          </p>
        </div>

        {/* PROJECT CONTEXT */}
        {selectedProjectTitle && (
          <div className="bg-[rgba(99,102,241,0.15)] border border-[var(--border)] rounded-xl p-4 space-y-1">
            <p className="text-sm font-semibold text-[var(--primary)]">
              Practice project
            </p>
            <p className="text-sm text-[var(--text)]">
              {selectedProjectTitle}
            </p>
          </div>
        )}

        {/* NEXT OPTIONS */}
        {hasStartedCourse && selectedProjectTitle && (
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-4">
            <p className="font-semibold">
              What would you like to explore next?
            </p>

            <Link
              href="/work/internships"
              className="block border border-[var(--border)] rounded p-3 hover:bg-[var(--bg)]"
            >
              <p className="font-medium">
                Internships
              </p>
              <p className="text-xs text-[var(--muted)]">
                Gain real-world experience with guidance
              </p>
            </Link>

            <Link
              href="/work/jobs"
              className="block bg-[var(--primary)] text-white rounded p-3 hover:opacity-90"
            >
              <p className="font-medium">
                Jobs
              </p>
              <p className="text-xs opacity-90">
                Apply directly for entry-level roles
              </p>
            </Link>

            <p className="text-xs text-[var(--muted)] text-center">
              You can explore both anytime.
            </p>
          </div>
        )}

        {/* FALLBACK */}
        {!selectedProjectTitle && (
          <Link
            href="/work/projects"
            className="block text-center bg-[var(--primary)] text-white rounded p-3 hover:opacity-90"
          >
            Choose a practice project
          </Link>
        )}

        <Link
          href="/learning/courses"
          className="block text-center text-sm text-[var(--muted)] underline"
        >
          Continue learning
        </Link>
      </div>
    </div>
  );
}

export default function LearningProgressPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
          Loading...
        </p>
      }
    >
      <LearningProgressContent />
    </Suspense>
  );
}
