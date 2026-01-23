"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function StudentResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const loadResult = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("student_assessments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (!data || data.length === 0) {
        router.push("/student/assessment");
        return;
      }

      setResult(data[0]);
    };

    loadResult();
  }, [router]);

  if (!result) {
    return <p className="p-8">Loading result...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Your Career Snapshot
        </h1>

        <p>
          <strong>Career clarity:</strong>{" "}
          {result.career_clarity.replace("_", " ")}
        </p>

        <p>
          <strong>Skill level:</strong> {result.skill_level}
        </p>

        <div className="border-t pt-4">
          <p className="font-medium mb-2">Recommended next steps:</p>
          <ul className="list-disc list-inside text-sm">
            <li>Explore suitable career paths</li>
            <li>Identify skill gaps</li>
            <li>Start focused learning</li>
            <li>Mentor guidance (coming soon)</li>
          </ul>
        </div>

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
