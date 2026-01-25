"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

// V1 mock learning state
const activeCourse = {
  title: "Web Development Basics",
  completedLessons: 1,
  totalLessons: 4,
};

// Human-readable project names
const PROJECT_LABELS: Record<string, string> = {
  "portfolio-website": "Build a Personal Portfolio Website",
  "landing-page": "Design a Marketing Landing Page",
  "python-script": "Build a Simple Python Automation Script",
};

export default function LearningProgressPage() {
  const { loading } = useRequireAuth();
  const params = useSearchParams();

  const selectedProjectId = params.get("project");
  const selectedProjectTitle =
    selectedProjectId && PROJECT_LABELS[selectedProjectId];

  const hasStartedCourse = activeCourse.completedLessons > 0;

  if (loading) return <p className="p-8">Loading progress...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Your Learning Progress</h1>

      {/* COURSE STATUS */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold">{activeCourse.title}</h2>
        <p className="text-sm text-gray-600">
          Progress: {activeCourse.completedLessons} /{" "}
          {activeCourse.totalLessons} lessons
        </p>
      </div>

      {/* PROJECT CONTEXT */}
      {selectedProjectTitle && (
        <div className="border rounded p-4 bg-blue-50 space-y-1">
          <p className="text-sm font-semibold">Practice project</p>
          <p className="text-sm text-gray-700">
            {selectedProjectTitle}
          </p>
        </div>
      )}

      {/* 🔑 READINESS DECLARATION */}
{hasStartedCourse && selectedProjectTitle && (
  <div className="border rounded p-4 space-y-4">
    <p className="font-semibold">
      What would you like to explore next?
    </p>

    {/* INTERNSHIPS OPTION */}
    <Link
      href="/work/internships"
      className="block border rounded p-3 hover:bg-gray-50"
    >
      <p className="font-medium">Internships</p>
      <p className="text-xs text-gray-600">
        Gain real-world experience with guidance
      </p>
    </Link>

    {/* JOBS OPTION */}
    <Link
      href="/work/jobs"
      className="block bg-green-600 text-white rounded p-3 hover:bg-green-700"
    >
      <p className="font-medium">Jobs</p>
      <p className="text-xs text-green-100">
        Apply directly for entry-level roles
      </p>
    </Link>

    <p className="text-xs text-gray-500 text-center">
      You can explore both anytime.
    </p>
  </div>
)}


      {/* FALLBACK */}
      {!selectedProjectTitle && (
        <Link
          href="/work/projects"
          className="block text-center bg-green-600 text-white rounded p-3 hover:bg-green-700"
        >
          Choose a practice project
        </Link>
      )}

      {/* SECONDARY */}
      <Link
        href="/learning/courses"
        className="block text-center text-sm text-gray-500 underline"
      >
        Continue learning
      </Link>
    </div>
  );
}
