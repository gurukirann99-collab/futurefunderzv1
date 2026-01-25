"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type MentorRequest = {
  id: string;
  requester_id: string;
  requester_role: string;
  message: string;
  status: string;
  created_at: string;
};

export default function MentorRequestsPage() {
  const router = useRouter();

  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (profile?.role !== "mentor") {
        router.push("/dashboard");
        return;
      }

      const { data } = await supabase
        .from("mentor_requests")
        .select(
          "id, requester_id, requester_role, message, status, created_at"
        )
        .eq("mentor_id", session.user.id)
        .order("created_at", { ascending: false });

      setRequests(data || []);
      setLoading(false);
    };

    loadRequests();
  }, [router]);

  const updateStatus = async (
    requestId: string,
    newStatus: "accepted" | "rejected"
  ) => {
    await supabase
      .from("mentor_requests")
      .update({ status: newStatus })
      .eq("id", requestId);

    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: newStatus }
          : req
      )
    );
  };

  if (loading)
    return (
      <p className="p-6 bg-[var(--bg)] text-[var(--muted)]">
        Loading mentor requests...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 space-y-4 text-[var(--text)]">
      <h1 className="text-2xl font-bold">
        Mentor Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-[var(--muted)]">
          No mentorship requests yet.
        </p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl space-y-2"
        >
          <p className="font-medium">
            Request from {req.requester_role}
          </p>

          <p className="text-sm text-[var(--muted)]">
            {new Date(req.created_at).toDateString()}
          </p>

          <p className="text-sm">
            {req.message}
          </p>

          <p className="text-sm font-medium">
            Status:{" "}
            <span className="capitalize text-[var(--primary)]">
              {req.status}
            </span>
          </p>

          {req.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(req.id, "accepted")}
                className="border border-[var(--border)] px-3 py-1 rounded text-[rgb(34,197,94)] hover:bg-[var(--bg)]"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(req.id, "rejected")}
                className="border border-[var(--border)] px-3 py-1 rounded text-[rgb(239,68,68)] hover:bg-[var(--bg)]"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}

      <BackButton fallback="/dashboard" />
    </div>
  );
}
