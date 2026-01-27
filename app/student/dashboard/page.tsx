"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ===============================
   TYPES
=============================== */

type Stage = "exploration" | "focus" | "execution";

type CourseProgressRow = {
  progress: number;
  course: {
    title: string;
  } | null;
};

const LEVEL_SCORE: Record<string, number> = {
  basic: 0.4,
  intermediate: 0.7,
  advanced: 1,
};

export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [stage, setStage] = useState<Stage | null>(null);
  const [careerId, setCareerId] = useState<string | null>(null);

  const [careerReadiness, setCareerReadiness] = useState(0);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  const [course, setCourse] = useState<{ title: string; progress: number } | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      /* ===============================
         AUTH (STABLE)
      =============================== */
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }

      const userId = data.user.id;

      /* ===============================
         CAREER STAGE
      =============================== */
      const { data: assessment } = await supabase
        .from("student_assessments")
        .select("career_clarity, career_id")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!assessment) {
        router.replace("/student/assessment");
        return;
      }

      setStage(assessment.career_clarity);
      setCareerId(assessment.career_id);

      /* ===============================
         COURSE IN PROGRESS (TYPED)
      =============================== */
      const { data: progress } = await supabase
        .from("course_progress")
        .select(`
          progress,
          course:course_id ( title )
        `)
        .eq("user_id", userId)
        .eq("status", "in_progress")
        .single<CourseProgressRow>();

      if (progress?.course) {
        setCourse({
          title: progress.course.title,
          progress: progress.progress,
        });
      }

      /* ===============================
         CAREER SKILL GAP
      =============================== */
      if (assessment.career_id) {
        const { data: req } = await supabase
          .from("career_skills")
          .select("skill_id")
          .eq("career_id", assessment.career_id);

        const { data: learned } = await supabase
          .from("student_skills")
          .select("skill_id, level")
          .eq("user_id", userId);

        let score = 0;
        let missing: string[] = [];

        req?.forEach((r) => {
          const s = learned?.find((l) => l.skill_id === r.skill_id);
          if (!s) {
            missing.push(r.skill_id);
            return;
          }
          score += LEVEL_SCORE[s.level] ?? 0.4;
        });

        const readiness =
          req && req.length > 0
            ? Math.round((score / req.length) * 100)
            : 0;

        setCareerReadiness(readiness);
        setMissingSkills(missing);
      }

      /* ===============================
         JOB MATCHES
      =============================== */
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id,title")
        .limit(3);

      setJobs(jobsData || []);
      setLoading(false);
    };

    load();
  }, [router]);

  if (loading) {
    return <p className="p-8 text-[var(--muted)]">Loading dashboard…</p>;
  }

  const nextAction =
    stage === "exploration"
      ? { label: "Start Learning", href: "/student/learning/courses" }
      : stage === "focus"
      ? { label: "Close Skill Gaps", href: `/student/skill-gap/${careerId}` }
      : { label: "Find Opportunities", href: "/student/work/jobs" };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">
            Welcome back 👋
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Career → Skills → Opportunities
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT */}
          <Card>
            <h3 className="font-semibold text-[var(--text)]">
              Career Readiness
            </h3>

            <p
              className="text-3xl font-bold mt-2"
              style={{
                color:
                  careerReadiness >= 70
                    ? "var(--success, #16a34a)"
                    : "var(--warning, #ea580c)",
              }}
            >
              {careerReadiness}%
            </p>

            {missingSkills.length > 0 && (
              <p className="text-xs text-[var(--muted)] mt-2">
                {missingSkills.length} skills blocking progress
              </p>
            )}

            <Link
              href={`/student/skill-gap/${careerId}`}
              className="block mt-4 text-center text-sm rounded-lg py-2
                         bg-[var(--accent)]/15 text-[var(--accent)]"
            >
              View Skill Gaps →
            </Link>
          </Card>

          {/* CENTER */}
          <div className="lg:col-span-2 space-y-6">

            {course && (
              <Card>
                <h3 className="font-semibold text-[var(--text)]">
                  Continue Learning
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {course.title}
                </p>

                <ProgressBar value={course.progress} />

                <Link
                  href="/student/learning/progress"
                  className="inline-block mt-4
                             bg-[var(--primary)] text-white
                             px-4 py-2 rounded-lg text-sm"
                >
                  Resume →
                </Link>
              </Card>
            )}

            <Card>
              <h3 className="font-semibold text-[var(--text)]">
                Career Path
              </h3>
              <div className="flex gap-3 mt-3 overflow-x-auto">
                <PathStep label="Explore" done />
                <PathStep label="Skills" active={stage === "focus"} />
                <PathStep label="Work" future />
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-[var(--text)]">
                Job Matches
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {jobs.map((job) => (
                  <li key={job.id} className="flex justify-between">
                    {job.title}
                    <Link
                      href={`/student/work/jobs/${job.id}`}
                      className="text-[var(--primary)]"
                    >
                      →
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
              <h3 className="font-semibold">Mentor Support</h3>
              <p className="text-sm opacity-90">
                Get clarity from a career expert
              </p>
              <Link
                href="/mentor/request"
                className="block mt-4 bg-white
                           text-[var(--primary)]
                           text-center py-2 rounded-lg font-medium"
              >
                Talk to Mentor →
              </Link>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href={nextAction.href}
            className="inline-block
                       bg-[var(--primary)] text-white
                       px-8 py-3 rounded-xl"
          >
            {nextAction.label}
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI COMPONENTS ---------- */

function Card({ children, className = "" }: any) {
  return (
    <div
      className={`bg-[var(--card)]
                  border border-[var(--border)]
                  rounded-2xl p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-[var(--border)] rounded-full h-2 mt-3">
      <div
        className="bg-[var(--primary)] h-2 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function PathStep({
  label,
  done,
  active,
  future,
}: {
  label: string;
  done?: boolean;
  active?: boolean;
  future?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-lg text-sm ${
        done
          ? "bg-[var(--success)]/15 text-[var(--success)]"
          : active
          ? "bg-[var(--primary)]/15 text-[var(--primary)]"
          : future
          ? "bg-[var(--border)] text-[var(--muted)]"
          : ""
      }`}
    >
      {label}
    </div>
  );
}
