"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type JourneyItem = {
  stage: string;
  created_at: string;
};

export default function MyJourneyPage() {
  const router = useRouter();

  const [history, setHistory] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJourney = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/auth/login");
        return;
      }

      // ✅ FIX: profiles PK is `id`
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !profile?.role) {
        router.replace("/role");
        return;
      }

      let journeyData: JourneyItem[] = [];

      if (profile.role === "student") {
        const { data } = await supabase
          .from("student_journey_history")
          .select("stage, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        journeyData = data || [];
      } 
      else if (profile.role === "entrepreneur") {
        const { data } = await supabase
          .from("entrepreneur_stage_history")
          .select("stage, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        journeyData = data || [];
      } 
      else {
        // mentor / parent / partner → not applicable
        router.replace("/role");
        return;
      }

      setHistory(journeyData);
      setLoading(false);
    };

    loadJourney();
  }, [router]);

  if (loading) {
    return (
      <p className="p-6 bg-[var(--bg)] text-[var(--muted)]">
        Loading your journey...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 space-y-4 text-[var(--text)]">
      <h1 className="text-2xl font-bold">My Journey</h1>

      {history.length === 0 && (
        <p className="text-[var(--muted)]">
          No journey data yet.
        </p>
      )}

      {history.map((item, index) => (
        <div
          key={index}
          className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl"
        >
          <p className="font-medium">
            Stage: {item.stage}
          </p>
          <p className="text-sm text-[var(--muted)]">
            {new Date(item.created_at).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
