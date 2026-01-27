"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PartnerAdmissionsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      // Partner's college (V2 simple mapping)
      const collegeId = session.user.id;

      const { data } = await supabase
        .from("admission_applications")
        .select(`
          id,
          status,
          applied_by,
          created_at,
          student:profiles!admission_applications_student_id_fkey (
            full_name
          )
        `)
        .eq("college_id", collegeId)
        .order("created_at", { ascending: false });

      setApps(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return <p className="p-6">Loading applications…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Admission Applications
      </h1>

      {apps.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No applications yet.
        </p>
      )}

      <div className="space-y-3">
        {apps.map((a) => (
          <div
            key={a.id}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {a.student?.full_name || "Student"}
              </p>
              <p className="text-xs text-[var(--muted)]">
                Applied by: {a.applied_by} ·{" "}
                {new Date(a.created_at).toDateString()}
              </p>
              <p className="text-xs mt-1">
                Status: <b>{a.status}</b>
              </p>
            </div>

            <Link
              href={`/partner/admissions/${a.id}`}
              className="text-[var(--primary)] text-sm"
            >
              Review →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
