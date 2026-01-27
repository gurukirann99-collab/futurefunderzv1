"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type MentorRequest = {
  status: string;
  message: string;
  created_at: string;
};

export default function MentorStatusPage() {
  const router = useRouter();

  const [request, setRequest] = useState<MentorRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from("mentor_requests")
        .select("status, message, created_at")
        .eq("requester_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!data) {
        router.push("/mentor/request");
        return;
      }

      setRequest(data);
      setLoading(false);
    };

    loadStatus();
  }, [router]);

  if (loading)
    return (
      <p className="p-6 bg-[var(--bg)] text-[var(--muted)]">
        Loading mentor request status...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-4 shadow text-[var(--text)]">
        <h1 className="text-2xl font-bold text-center">
          Mentor Request Status
        </h1>

        <div className="border border-[var(--border)] p-4 rounded bg-[var(--bg)]">
          <p className="font-medium">
            Status:
            <span className="ml-2 capitalize font-semibold text-[var(--primary)]">
              {request?.status}
            </span>
          </p>

          <p className="text-sm text-[var(--muted)] mt-2">
            Requested on{" "}
            {new Date(request!.created_at).toDateString()}
          </p>
        </div>

        <div className="border border-[var(--border)] p-4 rounded bg-[var(--bg)]">
          <p className="font-medium mb-1">
            Your message
          </p>
          <p className="text-sm text-[var(--muted)]">
            {request?.message}
          </p>
        </div>

        {request?.status === "accepted" && (
          <p className="text-sm text-[rgb(34,197,94)] text-center">
            🎉 Your mentor has accepted your request.
            Further steps will be shared soon.
          </p>
        )}

        {request?.status === "rejected" && (
          <p className="text-sm text-[rgb(239,68,68)] text-center">
            ❌ Your mentor could not accept the request at this time.
          </p>
        )}

        {request?.status === "pending" && (
          <p className="text-sm text-[var(--muted)] text-center">
            ⏳ Your request is under review.
          </p>
        )}

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 border border-[var(--border)] py-2 rounded hover:bg-[var(--bg)]"
        >
          Back to Dashboard
        </button>

        <BackButton fallback="/dashboard" />
      </div>
    </div>
  );
}
