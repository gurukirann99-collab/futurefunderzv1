"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminWorkPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("jobs")
      .select("id, title, job_type, salary_min, salary_max")
      .order("created_at", { ascending: false })
      .then(({ data }) => setJobs(data || []));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Work Opportunities</h1>
        <Link
          href="/admin/work/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          + New Opportunity
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="border border-[var(--border)] rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{j.title}</p>
              <p className="text-xs text-[var(--muted)]">
                {j.job_type.toUpperCase()} · ₹{j.salary_min} – ₹{j.salary_max}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/work/applications"
        className="text-sm text-[var(--primary)] underline"
      >
        View Applications →
      </Link>
    </div>
  );
}
