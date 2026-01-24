"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";

export default function StudentAssessmentPage() {
  const router = useRouter();

  const [careerClarity, setCareerClarity] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Prevent duplicate assessment
  useEffect(() => {
    const checkExisting = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      useEffect(() => {
  const checkRetakeEligibility = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data } = await supabase
      .from("student_journey_history")
      .select("created_at")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!data || data.length === 0) return;

    const lastAttempt = new Date(data[0].created_at);
    const diffDays =
      (Date.now() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 14) {
      router.push("/student/result");
    }
  };

  checkRetakeEligibility();
}, [router]);

    };

    checkExisting();
  }, [router]);

  const submitAssessment = async () => {
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

    // 🔹 RULE-BASED STAGE LOGIC (V1)
    let derivedStage = "Exploration";

    if (
      careerClarity === "very_clear" &&
      (skillLevel === "intermediate" || skillLevel === "advanced")
    ) {
      derivedStage = "Focus";
    }

    // 1️⃣ Save original assessment (V1)
    const { error: assessmentError } = await supabase
      .from("student_assessments")
      .insert({
        user_id: session.user.id,
        career_clarity: careerClarity,
        skill_level: skillLevel,
        stage: derivedStage, // optional but useful
      });

    if (assessmentError) {
      setError(assessmentError.message);
      setLoading(false);
      return;
    }

    // 🔴 🔴 🔴 NEW: SAVE JOURNEY MEMORY (V2 · PILLAR 1)
    await supabase.from("student_journey_history").insert({
      user_id: session.user.id,
      stage: derivedStage,
    });
    // 🔴 🔴 🔴 THIS IS THE ONLY V2 ADDITION

    router.push("/student/result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Career Assessment
        </h1>

        {/* Question 1 */}
        <div>
          <p className="font-medium mb-2">
            How clear are you about your career direction?
          </p>
          <select
            className="w-full border p-2 rounded"
            value={careerClarity}
            onChange={(e) => setCareerClarity(e.target.value)}
          >
            <option value="">Select one</option>
            <option value="very_clear">Very clear</option>
            <option value="somewhat_clear">Somewhat clear</option>
            <option value="exploring">Exploring options</option>
            <option value="no_idea">No idea yet</option>
          </select>
        </div>

        {/* Question 2 */}
        <div>
          <p className="font-medium mb-2">
            How confident are you in your current skills?
          </p>
          <select
            className="w-full border p-2 rounded"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="">Select one</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading || !careerClarity || !skillLevel}
          onClick={submitAssessment}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Assessment"}
        </button>

        {/* ✅ BACK BUTTON (KEPT AS YOU WANTED) */}
        <BackButton fallback="/dashboard" />
      </div>
    </div>
  );
}
