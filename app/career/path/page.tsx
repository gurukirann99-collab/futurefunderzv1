"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CareerPathPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<string | null>(null);

  useEffect(() => {
    const loadCareerPath = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("student_assessments")
        .select("career_clarity")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!data || data.length === 0) {
        router.replace("/career/discovery");
        return;
      }

      setStage(data[0].career_clarity);
      setLoading(false);
    };

    loadCareerPath();
  }, [router]);

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading your path...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8">
      <div className="max-w-xl mx-auto space-y-6 bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow text-[var(--text)]">
        <h1 className="text-2xl font-bold text-center">
          Your Career Path
        </h1>

        {/* ===== EXPLORATION ===== */}
        {stage === "exploration" && (
          <div className="space-y-4">
            <p className="text-[var(--muted)]">
              You’re at the exploration stage.  
              The goal right now is to understand basics and try things without pressure.
            </p>

            <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
              <li>Learn foundational skills</li>
              <li>Explore different domains</li>
              <li>Try small projects</li>
            </ul>

            <Link
              href="/learning/courses"
              className="block text-center bg-[var(--primary)] text-white rounded p-3 hover:opacity-90"
            >
              Start Learning
            </Link>
          </div>
        )}

        {/* ===== FOCUS ===== */}
        {stage === "focus" && (
          <div className="space-y-4">
            <p className="text-[var(--muted)]">
              You have some clarity.  
              Now it’s time to build job-ready skills and gain confidence.
            </p>

            <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
              <li>Follow a focused skill path</li>
              <li>Practice with guided projects</li>
              <li>Prepare for real opportunities</li>
            </ul>

            <Link
              href="/learning/courses"
              className="block text-center bg-[var(--primary)] text-white rounded p-3 hover:opacity-90"
            >
              Continue Learning
            </Link>
          </div>
        )}

        {/* ===== EXECUTION ===== */}
        {stage === "execution" && (
          <div className="space-y-4">
            <p className="text-[var(--muted)]">
              You’re ready to apply your skills.  
              The focus now is getting real-world experience.
            </p>

            <ul className="list-disc pl-5 text-sm text-[var(--muted)]">
              <li>Apply to projects or internships</li>
              <li>Look for entry-level roles</li>
              <li>Track applications</li>
            </ul>

            <Link
              href="/work/projects"
              className="block text-center bg-[var(--primary)] text-white rounded p-3 hover:opacity-90"
            >
              Find Opportunities
            </Link>
          </div>
        )}

        {/* SAFETY */}
        {!stage && (
          <div className="text-center">
            <Link
              href="/career/discovery"
              className="text-[var(--primary)] underline"
            >
              Start career discovery
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
