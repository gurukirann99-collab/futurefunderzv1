"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/app/components/BackButton";

export default function CareerDiscoveryPage() {
  const router = useRouter();

  const [education, setEducation] = useState("");
  const [interest, setInterest] = useState("");
  const [clarity, setClarity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!education || !interest || !clarity) return;
    
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login?redirect=/career/discovery");
      return;
    }

    // 🧠 Simple V1 logic
    let stage = "exploration";

    if (clarity === "mostly-clear") stage = "execution";
    else if (clarity === "somewhat-clear") stage = "focus";

    // Save assessment
    await supabase.from("student_assessments").insert({
      user_id: session.user.id,
      career_clarity: stage,
      skill_level: interest,
    });

    // Save journey history
    await supabase.from("student_journey_history").insert({
      user_id: session.user.id,
      stage: stage,
    });

    router.push("/career/path");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-6">
        <BackButton />
        <h1 className="text-2xl font-bold text-center">
          Let’s understand where you are
        </h1>

        {/* Q1 */}
        <div>
          <p className="font-medium mb-2">Your current situation</p>
          <select
            className="w-full border p-2 rounded"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select one</option>
            <option value="school">School student</option>
            <option value="college">College student</option>
            <option value="graduate">Graduate</option>
            <option value="working">Working professional</option>
          </select>
        </div>

        {/* Q2 */}
        <div>
          <p className="font-medium mb-2">What interests you more?</p>
          <select
            className="w-full border p-2 rounded"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Select one</option>
            <option value="tech">Technology / IT</option>
            <option value="business">Business / Management</option>
            <option value="creative">Creative / Design</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>

        {/* Q3 */}
        <div>
          <p className="font-medium mb-2">
            How confident do you feel about your next step?
          </p>
          <select
            className="w-full border p-2 rounded"
            value={clarity}
            onChange={(e) => setClarity(e.target.value)}
          >
            <option value="">Select one</option>
            <option value="very-confused">Very confused</option>
            <option value="somewhat-clear">Somewhat clear</option>
            <option value="mostly-clear">Mostly clear</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-3 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          No right or wrong answers. This helps us guide you better.
        </p>
      
      </div>
    </div>
  );
}
