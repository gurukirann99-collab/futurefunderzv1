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
        router.push("/login");
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

  if (loading) {
    return <p className="p-6">Loading mentor request status...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Mentor Request Status
        </h1>

        <div className="border p-4 rounded bg-gray-50">
          <p className="font-medium">
            Status:
            <span className="ml-2 capitalize font-semibold">
              {request?.status}
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Requested on{" "}
            {new Date(request!.created_at).toDateString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium mb-1">Your message</p>
          <p className="text-sm text-gray-700">
            {request?.message}
          </p>
        </div>

        {request?.status === "accepted" && (
          <p className="text-sm text-green-600 text-center">
            🎉 Your mentor has accepted your request.
            Further steps will be shared soon.
          </p>
        )}

        {request?.status === "rejected" && (
          <p className="text-sm text-red-600 text-center">
            ❌ Your mentor could not accept the request at this time.
          </p>
        )}

        {request?.status === "pending" && (
          <p className="text-sm text-gray-600 text-center">
            ⏳ Your request is under review.
          </p>
        )}

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 border py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
