"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [careerDone, setCareerDone] = useState(false);

  // V1 mock states (replace later)
  const learningStarted = true; // mock
  const workStarted = false; // mock

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: assessment } = await supabase
        .from("student_assessments")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

      setCareerDone(!!assessment && assessment.length > 0);
      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  if (loading) return <p className="p-8">Loading your space...</p>;

  /* 🎯 NEXT STEP LOGIC */
  let nextStep = {
    title: "",
    description: "",
    href: "",
  };

  if (!careerDone) {
    nextStep = {
      title: "Discover your career direction",
      description:
        "Answer a few questions to understand what paths suit you right now.",
      href: "/career/discovery",
    };
  } else if (!learningStarted) {
    nextStep = {
      title: "Start learning",
      description:
        "Build foundational skills before moving to real opportunities.",
      href: "/learning/courses",
    };
  } else if (!workStarted) {
    nextStep = {
      title: "Practice with real projects",
      description:
        "Apply what you’ve learned through guided practice projects.",
      href: "/work/projects",
    };
  } else {
    nextStep = {
      title: "Explore jobs",
      description:
        "Start applying for entry-level opportunities.",
      href: "/work/jobs",
    };
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      {/* 👋 CONTEXT */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back 👋
        </h1>
        <p className="text-gray-600 text-sm">
          Let’s continue where you left off.
        </p>
      </div>

      {/* 🎯 PRIMARY NEXT STEP */}
      <div className="rounded-xl border bg-blue-50 p-6 space-y-3">
        <p className="text-xs uppercase tracking-wide text-blue-700">
          Your next step
        </p>
        <h2 className="text-xl font-semibold">
          {nextStep.title}
        </h2>
        <p className="text-sm text-gray-700">
          {nextStep.description}
        </p>

        <Link
          href={nextStep.href}
          className="inline-block mt-3 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Continue →
        </Link>
      </div>

      {/* 🧭 JOURNEY PROGRESS */}
      <div className="space-y-3">
        <h2 className="font-semibold">Your journey</h2>

        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className={`border rounded p-4 ${careerDone ? "bg-green-50" : ""}`}>
            <p className="font-medium">Career</p>
            <p className="text-gray-600">
              {careerDone ? "Completed" : "Pending"}
            </p>
          </div>

          <div
            className={`border rounded p-4 ${
              learningStarted ? "bg-yellow-50" : ""
            }`}
          >
            <p className="font-medium">Learning</p>
            <p className="text-gray-600">
              {learningStarted ? "In progress" : "Not started"}
            </p>
          </div>

          <div
            className={`border rounded p-4 ${
              workStarted ? "bg-yellow-50" : ""
            }`}
          >
            <p className="font-medium">Work</p>
            <p className="text-gray-600">
              {workStarted ? "In progress" : "Not started"}
            </p>
          </div>
        </div>
      </div>

      {/* 🔗 SECONDARY ACTIONS */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <Link href="/career/path" className="underline">
          Career path
        </Link>
        <Link href="/learning/progress" className="underline">
          Learning progress
        </Link>
        <Link href="/work/applications" className="underline">
          Applications
        </Link>
      </div>
    </div>
  );
}
