"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { useEffect } from "react";

export default function EntrepreneurStagePage() {
  const router = useRouter();
  const [stage, setStage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  const checkExisting = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data } = await supabase
      .from("entrepreneur_stages")
      .select("id")
      .eq("user_id", session.user.id)
      .limit(1);

    if (data && data.length > 0) {
      router.push("/entrepreneur/result");
    }
  };

  checkExisting();
}, [router]);




  const submitStage = async () => {
    setLoading(true);
    setError("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setError("Please login again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("entrepreneur_stages").insert({
      user_id: session.user.id,
      business_stage: stage,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/entrepreneur/result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Business Stage
        </h1>

        <p className="text-sm text-gray-600 text-center">
          Tell us where your business currently stands
        </p>

        <select
          className="w-full border p-2 rounded"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="">Select your stage</option>
          <option value="idea">Just an idea</option>
          <option value="early_revenue">Early revenue</option>
          <option value="registered">Registered business</option>
          <option value="scaling">Scaling business</option>
        </select>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading || !stage}
          onClick={submitStage}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
          <BackButton fallback="/dashboard" />
      </div>
    </div>
  );
}
