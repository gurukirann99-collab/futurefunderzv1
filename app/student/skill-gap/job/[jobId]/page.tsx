"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { calculateSkillGap } from "@/lib/skillGapEngine";

/* ---------- TYPES ---------- */
type StudentSkill = {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced";
};

type Job = {
  id: string;
  title: string;
  job_type: string;
};

export default function JobSkillGapPage() {
  const { jobId } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [gap, setGap] = useState<any>(null);
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const load = async () => {
      setLoading(true);

      /* 🔐 Session */
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
        return;
      }

      /* 1️⃣ Job info */
      const { data: jobData } = await supabase
        .from("jobs")
        .select("id,title,job_type")
        .eq("id", jobId)
        .single();

      setJob(jobData);

      /* 2️⃣ Central skill gap engine */
      const gapData = await calculateSkillGap({
        userId: session.user.id,
        entityId: jobId as string,
        type: "job",
      });

      /* 3️⃣ Student skill levels */
      const { data: ss } = await supabase
        .from("student_skills")
        .select(
          `
          level,
          skills:skill_id (
            id,
            name
          )
        `
        )
        .eq("user_id", session.user.id);

      const mappedSkills: StudentSkill[] =
        ss?.map((s: any) => ({
          id: s.skills.id,
          name: s.skills.name,
          level: s.level,
        })) || [];

      setGap(gapData);
      setStudentSkills(mappedSkills);
      setLoading(false);
    };

    load();
  }, [jobId, router]);

  if (loading) {
    return <p className="p-6">Checking job readiness…</p>;
  }

  /* 🔢 Weighted readiness calculation */
  let weightedScore = 0;

  gap.required.forEach((r: any) => {
    const skill = studentSkills.find(
      (s) => s.id === r.id
    );
    if (!skill) return;

    if (skill.level === "advanced") weightedScore += 1;
    else if (skill.level === "intermediate")
      weightedScore += 0.7;
    else weightedScore += 0.4;
  });

  const readiness =
    gap.required.length === 0
      ? 0
      : Math.round(
          (weightedScore / gap.required.length) *
            100
        );

  const canApply = readiness >= 70;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Job Readiness Check
        </h1>
        <p className="text-sm text-[var(--muted)]">
          {job?.title} · {job?.job_type}
        </p>
      </div>

      {/* Readiness */}
      <div className="border rounded-xl p-4">
        <p className="text-sm text-[var(--muted)]">
          Your readiness
        </p>
        <p
          className={`text-3xl font-bold ${
            canApply ? "text-green-600" : "text-red-600"
          }`}
        >
          {readiness}%
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h2 className="font-semibold">
          Required Skills
        </h2>

        {gap.required.map((s: any) => {
          const skill = studentSkills.find(
            (l) => l.id === s.id
          );

          let status = "🔴 Missing";
          if (skill?.level === "beginner")
            status = "🟡 Beginner";
          if (skill?.level === "intermediate")
            status = "🟢 Intermediate";
          if (skill?.level === "advanced")
            status = "🟢 Advanced";

          return (
            <div
              key={s.id}
              className="flex justify-between border-b py-1"
            >
              <span>{s.name}</span>
              <span>{status}</span>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      {!canApply && (
        <div className="space-y-3">
          <h2 className="font-semibold">
            Courses to Improve Readiness
          </h2>

          {gap.courses.map((c: any) => (
            <Link
              key={c.id}
              href={`/student/learning/courses/${c.id}`}
              className="block border rounded p-3 hover:bg-[var(--card)]"
            >
              {c.title}
            </Link>
          ))}
        </div>
      )}

      {/* Action */}
      <div className="pt-4">
        {canApply ? (
          <button
            onClick={() =>
              router.push(
                `/student/work/jobs/${jobId}/apply`
              )
            }
            className="btn-primary"
          >
            Apply Now
          </button>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Complete the recommended skills to apply.
          </p>
        )}
      </div>
    </div>
  );
}
