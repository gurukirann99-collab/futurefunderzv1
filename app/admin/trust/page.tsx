"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTrustPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("reports")
      .select("id, reason, status, created_at, reported_user_id")
      .order("created_at", { ascending: false })
      .then(({ data }) => setReports(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from("reports")
      .update({ status })
      .eq("id", id);

    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status } : r
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Trust & Safety</h1>

      {reports.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No reports yet.
        </p>
      )}

      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="border border-[var(--border)] rounded-lg p-4"
          >
            <p className="font-medium">
              Report ID: {r.id}
            </p>

            <p className="text-sm text-[var(--muted)] mt-1">
              Reason: {r.reason}
            </p>

            <p className="text-xs text-[var(--muted)] mt-1">
              Reported User: {r.reported_user_id}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <select
                className="border p-1 rounded text-sm"
                value={r.status}
                onChange={(e) =>
                  updateStatus(r.id, e.target.value)
                }
              >
                <option value="open">Open</option>
                <option value="reviewing">Reviewing</option>
                <option value="resolved">Resolved</option>
              </select>

              <span className="text-xs text-[var(--muted)]">
                {new Date(r.created_at).toDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
