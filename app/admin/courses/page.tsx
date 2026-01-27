"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, level")
        .order("title");
      setCourses(data || []);
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          + New Course
        </Link>
      </div>

      <div className="space-y-3">
        {courses.map((c) => (
          <div
            key={c.id}
            className="border border-[var(--border)] rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-xs text-[var(--muted)]">
                Level: {c.level || "Beginner"}
              </p>
            </div>

            <Link
              href={`/admin/courses/${c.id}/edit`}
              className="text-sm text-[var(--primary)]"
            >
              Edit →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
