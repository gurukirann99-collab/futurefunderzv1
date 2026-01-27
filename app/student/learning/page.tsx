"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LearningDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const { data } = await supabase
        .from("course_progress")
        .select(`
          progress,
          status,
          courses (
            id,
            title
          )
        `)
        .eq("user_id", session.user.id)
        .order("updated_at", { ascending: false });

      setCourses(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p className="p-6">Loading learning…</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Learning</h1>

      {courses.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          You haven’t started any courses yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <div
            key={c.courses.id}
            className="border rounded-xl p-4 space-y-2"
          >
            <h3 className="font-semibold">
              {c.courses.title}
            </h3>

            <p className="text-sm text-[var(--muted)]">
              Progress: {c.progress}%
            </p>

            <Link
              href={`/student/learning/courses/${c.courses.id}`}
              className="text-sm text-[var(--primary)] underline"
            >
              {c.status === "completed"
                ? "View course"
                : "Continue learning →"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
