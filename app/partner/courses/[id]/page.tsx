"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function PartnerCourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [mapped, setMapped] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [level, setLevel] = useState("beginner");

  useEffect(() => {
    supabase.from("courses").select("*").eq("id", id).single()
      .then(({ data }) => setCourse(data));

    supabase.from("skills").select("id,name")
      .then(({ data }) => setSkills(data || []));

    loadMapped();
  }, [id]);

  const loadMapped = async () => {
    const { data } = await supabase
      .from("course_skills")
      .select(`
        id,
        level,
        skills (
          id,
          name
        )
      `)
      .eq("course_id", id);

    setMapped(data || []);
  };

  const addSkill = async () => {
    if (!selectedSkill) return;

    await supabase.from("course_skills").insert({
      course_id: id,
      skill_id: selectedSkill,
      level,
    });

    setSelectedSkill("");
    loadMapped();
  };

  if (!course) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <h1 className="text-xl font-bold">{course.title}</h1>

      <p className="text-sm text-[var(--muted)]">
        {course.category} · {course.mode} · {course.level}
      </p>

      {/* MAP SKILLS */}
      <div className="border rounded-xl p-4 space-y-3">
        <h2 className="font-semibold">Skills taught in this course</h2>

        <div className="flex gap-2">
          <select
            className="input"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Select skill</option>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button onClick={addSkill} className="btn-secondary">
            Add
          </button>
        </div>

        {mapped.length === 0 && (
          <p className="text-sm text-[var(--muted)]">
            No skills mapped yet.
          </p>
        )}

        <ul className="space-y-1 text-sm">
          {mapped.map((m) => (
            <li key={m.id}>
              • {m.skills.name} ({m.level})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
