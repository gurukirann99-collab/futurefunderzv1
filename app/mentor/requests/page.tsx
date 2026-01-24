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

      // 🔹 Mentor-only access
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (profile?.role !== "mentor") {
        router.push("/dashboard");
        return;
      }

      // 🔹 Load requests sent to this mentor
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

  if (loading) {
    return <p className="p-6">Loading mentor requests...</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Mentor Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-600">
          No mentorship requests yet.
        </p>
      )}

      {requests.map((req) => (
        <div
          key={req.id}
          className="border p-4 rounded space-y-2"
        >
          <p className="font-medium">
            Request from {req.requester_role}
          </p>

          <p className="text-sm text-gray-600">
            {new Date(req.created_at).toDateString()}
          </p>

          <p className="text-sm">
            {req.message}
          </p>

          <p className="text-sm font-medium">
            Status:{" "}
            <span className="capitalize">
              {req.status}
            </span>
          </p>

          {req.status === "pending" && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateStatus(req.id, "accepted")
                }
                className="border px-3 py-1 rounded text-green-600"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(req.id, "rejected")
                }
                className="border px-3 py-1 rounded text-red-600"
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
