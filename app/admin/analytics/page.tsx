"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Stat = {
  label: string;
  value: number | string;
};

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const [
        users,
        skills,
        courses,
        careers,
        jobs,
        applications,
      ] = await Promise.all([
        supabase.from("profiles").select("user_id", { count: "exact" }),
        supabase.from("skills").select("id", { count: "exact" }),
        supabase.from("courses").select("id", { count: "exact" }),
        supabase.from("careers").select("id", { count: "exact" }),
        supabase.from("jobs").select("id", { count: "exact" }),
        supabase.from("applications").select("id", {
          count: "exact",
        }),
      ]);

      const roles = await supabase
        .from("profiles")
        .select("role");

      const roleCounts: Record<string, number> = {};
      roles.data?.forEach((r) => {
        roleCounts[r.role] = (roleCounts[r.role] || 0) + 1;
      });

      setStats([
        { label: "Total Users", value: users.count || 0 },
        {
          label: "Students",
          value: roleCounts["student"] || 0,
        },
        {
          label: "Parents",
          value: roleCounts["parent"] || 0,
        },
        {
          label: "Partners",
          value: roleCounts["partner"] || 0,
        },
        {
          label: "Mentors",
          value: roleCounts["mentor"] || 0,
        },
        {
          label: "Admins",
          value: roleCounts["admin"] || 0,
        },
        { label: "Skills", value: skills.count || 0 },
        { label: "Courses", value: courses.count || 0 },
        { label: "Careers", value: careers.count || 0 },
        {
          label: "Work Opportunities",
          value: jobs.count || 0,
        },
        {
          label: "Applications",
          value: applications.count || 0,
        },
      ]);

      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="p-6">Loading analytics…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics & Insights</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card)]"
          >
            <p className="text-xs text-[var(--muted)]">
              {s.label}
            </p>
            <p className="text-2xl font-bold mt-1">
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
