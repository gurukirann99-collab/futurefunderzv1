"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setApps(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading applications...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-3xl mx-auto space-y-4 text-[var(--text)]">
        <h1 className="text-2xl font-bold">
          Your Applications
        </h1>

        {apps.length === 0 && (
          <p className="text-[var(--muted)] text-sm">
            You haven’t applied to any opportunities yet.
          </p>
        )}

        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 text-sm"
          >
            <p>
              {app.opportunity_type.toUpperCase()} —{" "}
              {app.opportunity_id}
            </p>
            <p className="text-[var(--muted)]">
              Applied on{" "}
              {new Date(app.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
