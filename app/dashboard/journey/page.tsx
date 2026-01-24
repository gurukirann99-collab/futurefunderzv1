"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyJourneyPage() {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJourney = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("student_journey_history")
        .select("stage, created_at")
        .eq("user_id", sessionData.session.user.id)
        .order("created_at", { ascending: false })
        .limit(3);

      setHistory(data || []);
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
        <p>No journey data yet.</p>
      )}

      {history.map((item, index) => (
        <div key={index} className="border p-3 rounded">
          <p className="font-medium">Stage: {item.stage}</p>
          <p className="text-sm text-gray-600">
            {new Date(item.created_at).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
