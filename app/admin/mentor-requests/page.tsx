"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "../adminGuard";

export default function AdminMentorRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const session = await requireAdmin(router);
      if (!session) return;

      const { data } = await supabase
        .from("mentor_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setRequests(data || []);
    };

    load();
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)]">
      <h1 className="text-xl font-bold mb-4">Mentor Requests</h1>

      {requests.map((r) => (
        <div
          key={r.id}
          className="bg-[var(--card)] border border-[var(--border)] p-3 mb-2 rounded-xl flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-[var(--muted)]">
              Requester:{" "}
              <span className="font-mono text-[var(--text)]">
                {r.requester_id}
              </span>
            </p>

            <p className="text-sm text-[var(--muted)]">
              Mentor:{" "}
              <span className="font-mono text-[var(--text)]">
                {r.mentor_id}
              </span>
            </p>
          </div>

          <span
            className={`px-2 py-1 text-xs rounded font-medium ${
              r.status === "accepted"
                ? "bg-[rgba(34,197,94,0.15)] text-[rgb(34,197,94)]"
                : r.status === "rejected"
                ? "bg-[rgba(239,68,68,0.15)] text-[rgb(239,68,68)]"
                : "bg-[rgba(234,179,8,0.15)] text-[rgb(234,179,8)]"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}
