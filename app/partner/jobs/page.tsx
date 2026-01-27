"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PartnerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("employer_id", session.user.id)
        .order("created_at", { ascending: false });

      setJobs(data || []);
    };
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobs & Internships</h1>
        <Link href="/partner/jobs/new" className="btn-primary">
          + New Listing
        </Link>
      </div>

      {jobs.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No listings created yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <Link
            key={j.id}
            href={`/partner/jobs/${j.id}`}
            className="border rounded-xl p-4 hover:shadow"
          >
            <h3 className="font-semibold">{j.title}</h3>
            <p className="text-sm text-[var(--muted)]">
              {j.job_type} · {j.location || "—"}
            </p>
            <p className="text-sm mt-1">
              ₹{j.salary_min || "—"} – ₹{j.salary_max || "—"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
