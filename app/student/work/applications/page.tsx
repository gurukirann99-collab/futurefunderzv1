"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Application = {
  id: string;
  created_at: string;
  opportunities: {
    id: string;
    title: string;
    type: string;
  }[];
};

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          created_at,
          opportunities (
            id,
            title,
            type
          )
        `)
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setApplications(data as Application[]);
      }

      setLoading(false);
    };

    loadApplications();
  }, []);

  if (loading) {
    return <p className="p-6">Loading your applications...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Applications</h1>

      {applications.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          You haven’t applied to any opportunities yet.
        </p>
      )}

      <div className="space-y-4">
        {applications.map((app) => {
          const opp = app.opportunities[0]; // ✅ extract first opportunity

          if (!opp) return null;

          return (
            <div
              key={app.id}
              className="border border-[var(--border)] rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Type: {opp.type.toUpperCase()}
                  </p>
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  Applied
                </span>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <p className="text-xs text-[var(--muted)]">
                  Applied on {new Date(app.created_at).toDateString()}
                </p>

                <Link
                  href={`/student/work/${opp.id}`}
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  View →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
