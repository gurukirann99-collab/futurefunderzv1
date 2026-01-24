"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

const DEFAULT_MENTOR_ID = "f320d4d1-256e-49f3-be09-2620481eb1ea";

export default function RequestMentorPage() {
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAccess = async () => {
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

      if (!profile || profile.role === "mentor") {
        router.push("/dashboard");
        return;
      }

      setRole(profile.role);

      // Prevent duplicate active request
      const { data } = await supabase
        .from("mentor_requests")
        .select("id")
        .eq("requester_id", session.user.id)
        .eq("status", "pending")
        .maybeSingle();

      if (data) {
        router.push("/mentor/status");
      }
    };

    checkAccess();
  }, [router]);

  const submitRequest = async () => {
    if (!message.trim()) {
      setError("Please explain why you need mentorship.");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user || !role) {
      setError("Please login again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("mentor_requests").insert({
      requester_id: session.user.id,
      mentor_id: DEFAULT_MENTOR_ID,
      requester_role: role,
      message,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/mentor/status");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Request a Mentor
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Tell us why you need mentorship
        </p>

        <textarea
          className="w-full border p-2 rounded"
          rows={5}
          placeholder="Briefly explain your situation or challenge..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          onClick={submitRequest}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
        <BackButton fallback="/dashboard" />
    </div>
    
  );
}
