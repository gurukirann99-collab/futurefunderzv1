"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { autoUpdateSkillsFromCourse } from "@/lib/skills/autoUpdateSkillsFromCourse";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      // Load course
      const { data: c } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      setCourse(c);

      // START / RESUME PROGRESS
      await supabase.from("course_progress").upsert({
        user_id: session.user.id,
        course_id: id,
        progress: 5,
        status: "in_progress",
        last_accessed: new Date().toISOString(),
      });

      setLoading(false);
    };

    load();
  }, [id]);

  /* ===============================
     ✅ MARK COURSE COMPLETED
  =============================== */
  const markCompleted = async () => {
    if (completing) return;
    setCompleting(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    // 1️⃣ Mark course completed
    await supabase
      .from("course_progress")
      .update({
        progress: 100,
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", session.user.id)
      .eq("course_id", id);

    // 2️⃣ 🔥 AUTO UPDATE SKILLS (THIS IS THE KEY)
    await autoUpdateSkillsFromCourse(session.user.id, id as string);

    alert("Course completed 🎉 Skills updated!");

    setCompleting(false);
  };

  if (loading) return <p className="p-6">Loading course…</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>

      <p className="text-sm text-[var(--muted)]">
        {course.description}
      </p>

      {/* CONTENT */}
      <div className="border rounded-xl p-6">
        <p>Course content goes here…</p>
      </div>

      {/* COMPLETE BUTTON */}
      <button
        onClick={markCompleted}
        disabled={completing}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {completing ? "Completing..." : "Mark as Completed"}
      </button>
    </div>
  );
}
