"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function PartnerJobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("jobs").select("*").eq("id", id).single()
      .then(({ data }) => setJob(data));

    supabase
      .from("job_applications")
      .select(`
        id,
        status,
        applied_at,
        student:profiles!job_applications_student_id_fkey (
          full_name
        )
      `)
      .eq("job_id", id)
      .then(({ data }) => setApps(data || []));
  }, [id]);

  if (!job) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">{job.title}</h1>
      <p className="text-sm">
        {job.job_type} · {job.location}
      </p>

      <h2 className="font-semibold mt-4">Applications</h2>

      {apps.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No applications yet.
        </p>
      )}

      <div className="space-y-3">
        {apps.map((a) => (
          <div key={a.id} className="border rounded p-3">
            <p className="font-medium">
              {a.student?.full_name}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {new Date(a.applied_at).toDateString()}
            </p>
            <p className="text-xs">Status: {a.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
