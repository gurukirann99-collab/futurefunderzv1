"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

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
        .maybeSingle();

      if (data) {
        router.replace("/entrepreneur/result");
      }
    };

    checkExisting();
  }, [router]);

  const submitStage = async () => {
    if (loading) return;

    if (!stage) {
      setError("Please select your business stage.");
      return;
    }

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

    const { error: stageError } = await supabase
      .from("entrepreneur_stages")
      .insert({
        user_id: session.user.id,
        business_stage: stage,
      });

    if (stageError) {
      setError(stageError.message);
      setLoading(false);
      return;
    }

    const { error: historyError } = await supabase
      .from("entrepreneur_stage_history")
      .insert({
        user_id: session.user.id,
        stage: stage,
      });

    if (historyError) {
      console.error("Stage history insert failed:", historyError.message);
    }

    router.replace("/entrepreneur/result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-6 shadow text-[var(--text)]">
        <h1 className="text-2xl font-bold text-center">
          Business Stage
        </h1>

        <p className="text-sm text-[var(--muted)] text-center">
          Tell us where your business currently stands
        </p>

        <select
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
          <p className="text-[rgb(239,68,68)] text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading || !stage}
          onClick={submitStage}
          className="w-full bg-[var(--primary)] text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

        <BackButton fallback="/dashboard" />
      </div>
    </div>
  );
}
