"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("applications")
      .select("id, opportunity_type, created_at, user_id")
      .order("created_at", { ascending: false })
      .then(({ data }) => setApps(data || []));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Applications</h1>

      <div className="space-y-3">
        {apps.map((a) => (
          <div
            key={a.id}
            className="border border-[var(--border)] rounded-lg p-4"
          >
            <p className="font-medium">
              Application ID: {a.id}
            </p>
            <p className="text-xs text-[var(--muted)]">
              Type: {a.opportunity_type} ·{" "}
              {new Date(a.created_at).toDateString()}
            </p>

            <select
              className="mt-2 border p-1 rounded text-sm"
              defaultValue="applied"
            >
              <option value="applied">Applied</option>
              <option value="reviewing">Reviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
