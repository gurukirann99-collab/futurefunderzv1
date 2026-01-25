"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ComingSoon from "../components/ComingSoon";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [careerDone, setCareerDone] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const learningStarted = false;
  const workStarted = false;

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!profile?.role) {
        router.replace("/role");
        return;
      }

      setRole(profile.role);

      if (profile.role !== "student") {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("student_assessments")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

      setCareerDone(!!data && data.length > 0);
      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading dashboard...
      </p>
    );

  if (role !== "student") {
    return <ComingSoon role={role!} />;
  }

  let nextStep = { title: "", description: "", href: "", button: "" };

  if (!careerDone) {
    nextStep = {
      title: "Discover your career direction",
      description:
        "Understand your interests and strengths to choose the right path.",
      href: "/career/discovery",
      button: "Start career discovery",
    };
  } else if (!learningStarted) {
    nextStep = {
      title: "Start learning essential skills",
      description:
        "Build foundational skills that prepare you for real-world work.",
      href: "/learning/courses",
      button: "Explore learning",
    };
  } else if (!workStarted) {
    nextStep = {
      title: "Practice with real projects",
      description:
        "Apply what you’ve learned through guided, practical projects.",
      href: "/work/projects",
      button: "View projects",
    };
  } else {
    nextStep = {
      title: "Explore opportunities",
      description:
        "Apply for internships or jobs that match your current skills.",
      href: "/work/jobs",
      button: "View opportunities",
    };
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto p-8 space-y-10 text-[var(--text)]">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <p className="text-sm text-[var(--muted)]">
            Your journey: Career → Learning → Work
          </p>
        </div>

        {/* Next Step */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
          <div>
            <p className="text-sm text-[var(--primary)] font-medium">
              Your next step
            </p>
            <h2 className="text-xl font-semibold">
              {nextStep.title}
            </h2>
            <p className="text-sm text-[var(--muted)] mt-1">
              {nextStep.description}
            </p>
          </div>

          <Link
            href={nextStep.href}
            className="inline-block bg-[var(--primary)] text-white rounded-md px-5 py-3 text-sm hover:opacity-90 transition"
          >
            {nextStep.button} →
          </Link>
        </div>

        {/* Progress */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-5">
          <h3 className="font-medium mb-2">Your progress</h3>
          <ul className="text-sm text-[var(--muted)] space-y-1">
            <li>{careerDone ? "✔" : "⏳"} Career clarity</li>
            <li>⏳ Learning</li>
            <li>⏳ Work</li>
          </ul>
        </div>

        {/* Links */}
        <div className="text-sm text-[var(--muted)] space-x-4">
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
    </div>
  );
}
