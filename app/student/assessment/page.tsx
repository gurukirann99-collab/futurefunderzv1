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

  useEffect(() => {
    const checkExisting = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      const { data } = await supabase
        .from("student_assessments")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (data) {
        router.replace("/student/result");
      }
    };

    checkExisting();
  }, [router]);

  const submitAssessment = async () => {
    if (loading) return;

    if (!careerClarity || !skillLevel) {
      setError("Please answer all questions.");
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

    let derivedStage = "Exploration";

    if (
      careerClarity === "very_clear" &&
      (skillLevel === "intermediate" || skillLevel === "advanced")
    ) {
      derivedStage = "Focus";
    }

    const { error: assessmentError } = await supabase
      .from("student_assessments")
      .insert({
        user_id: session.user.id,
        career_clarity: careerClarity,
        skill_level: skillLevel,
      });

    if (assessmentError) {
      setError(assessmentError.message);
      setLoading(false);
      return;
    }

    await supabase
      .from("student_journey_history")
      .insert({
        user_id: session.user.id,
        stage: derivedStage,
      });

    router.replace("/student/result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-6 text-[var(--text)] shadow">
        <h1 className="text-2xl font-bold text-center">
          Career Assessment
        </h1>

        <div>
          <p className="font-medium mb-2">
            How clear are you about your career direction?
          </p>
          <select
            className="w-full border border-[var(--border)] bg-[var(--bg)] p-2 rounded"
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

        <div>
          <p className="font-medium mb-2">
            How confident are you in your current skills?
          </p>
          <select
            className="w-full border border-[var(--border)] bg-[var(--bg)] p-2 rounded"
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
          <p className="text-[rgb(239,68,68)] text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading || !careerClarity || !skillLevel}
          onClick={submitAssessment}
          className="w-full bg-[var(--primary)] text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Assessment"}
        </button>

        <BackButton fallback="/dashboard" />
      </div>
    </div>
  );
}
