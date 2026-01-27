"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PartnerCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("courses")
        .select("*")
        .eq("partner_id", session.user.id)
        .order("created_at", { ascending: false });

      setCourses(data || []);
    };

    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href="/partner/courses/new" className="btn-primary">
          + New Course
        </Link>
      </div>

      {courses.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No courses created yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/partner/courses/${c.id}`}
            className="border rounded-xl p-4 hover:shadow"
          >
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-[var(--muted)]">
              {c.category} · {c.mode}
            </p>
            <p className="text-sm mt-1">
              Fee: ₹{c.fee || "Free"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
