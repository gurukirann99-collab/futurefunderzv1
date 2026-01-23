"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import { useEffect } from "react";

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
      .limit(1);

    if (data && data.length > 0) {
      router.push("/student/result");
    }
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

    const { error } = await supabase.from("student_assessments").insert({
      user_id: session.user.id,
      career_clarity: careerClarity,
      skill_level: skillLevel,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

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
            <BackButton fallback="/dashboard" />    
      </div>
    </div>
  );
}
