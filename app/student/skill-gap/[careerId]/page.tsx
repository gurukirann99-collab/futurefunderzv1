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

export default function CareerSkillGapPage() {
  const { careerId } = useParams();
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [studentSkills, setStudentSkills] = useState<StudentSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!careerId) return;

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

      /* 1️⃣ Central skill gap engine */
      const gap = await calculateSkillGap({
        userId: session.user.id,
        entityId: careerId as string,
        type: "career",
      });

      /* 2️⃣ Student skill levels */
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

      const mapped: StudentSkill[] =
        ss?.map((s: any) => ({
          id: s.skills.id,
          name: s.skills.name,
          level: s.level,
        })) || [];

      setStudentSkills(mapped);
      setData(gap);
      setLoading(false);
    };

    load();
  }, [careerId, router]);

  if (loading) {
    return <p className="p-6">Analyzing career readiness…</p>;
  }

  /* 🔢 Weighted readiness */
  let weightedScore = 0;

  data.required.forEach((r: any) => {
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
    data.required.length === 0
      ? 0
      : Math.round(
          (weightedScore / data.required.length) *
            100
        );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">
        Career Skill Gap Report
      </h1>

      {/* Readiness */}
      <div className="border rounded-xl p-4">
        <p className="text-sm text-[var(--muted)]">
          Career Readiness
        </p>
        <p className="text-3xl font-bold">
          {readiness}%
        </p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <h2 className="font-semibold">
          Required Skills
        </h2>

        {data.required.map((s: any) => {
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
      <div className="space-y-3">
        <h2 className="font-semibold">
          Recommended Courses
        </h2>

        {data.courses.length === 0 && (
          <p className="text-sm text-[var(--muted)]">
            You are fully ready for this career 🎉
          </p>
        )}

        {data.courses.map((c: any) => (
          <Link
            key={c.id}
            href={`/student/learning/courses/${c.id}`}
            className="block border rounded p-3 hover:bg-[var(--card)]"
          >
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
