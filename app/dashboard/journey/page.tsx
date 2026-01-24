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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJourney = async () => {
      // 1️⃣ Check session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // 2️⃣ Get user role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!profile?.role) {
        router.push("/dashboard");
        return;
      }

      setRole(profile.role);

      // 3️⃣ ROLE-BASED JOURNEY QUERY
      let journeyData: JourneyItem[] | null = null;

      if (profile.role === "student") {
        const { data } = await supabase
          .from("student_journey_history")
          .select("stage, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        journeyData = data;
      }

      if (profile.role === "entrepreneur") {
        const { data } = await supabase
          .from("entrepreneur_stage_history")
          .select("stage, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(3);

        journeyData = data;
      }

      // 4️⃣ Mentor has NO journey in V2
      if (profile.role === "mentor") {
        router.push("/dashboard");
        return;
      }

      setHistory(journeyData || []);
      setLoading(false);
    };

    loadJourney();
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading your journey...</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Journey</h1>

      {history.length === 0 && (
        <p className="text-gray-600">
          No journey data yet.
        </p>
      )}

      {history.map((item, index) => (
        <div key={index} className="border p-4 rounded">
          <p className="font-medium">
            Stage: {item.stage}
          </p>
          <p className="text-sm text-gray-600">
            {new Date(item.created_at).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
