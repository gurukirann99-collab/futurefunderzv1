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

    let stage = "exploration";
    if (clarity === "mostly-clear") stage = "execution";
    else if (clarity === "somewhat-clear") stage = "focus";

    await supabase.from("student_assessments").insert({
      user_id: session.user.id,
      career_clarity: stage,
      skill_level: interest,
    });

    await supabase.from("student_journey_history").insert({
      user_id: session.user.id,
      stage: stage,
    });

    router.push("/career/path");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full space-y-6 bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <BackButton />

        <h1 className="text-2xl font-bold text-center text-[var(--text)]">
          Let’s understand where you are
        </h1>

        {/* Q1 */}
        <div>
          <p className="font-medium mb-2 text-[var(--text)]">
            Your current situation
          </p>
          <select
            className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
          <p className="font-medium mb-2 text-[var(--text)]">
            What interests you more?
          </p>
          <select
            className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
          <p className="font-medium mb-2 text-[var(--text)]">
            How confident do you feel about your next step?
          </p>
          <select
            className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
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
          className="w-full bg-[var(--primary)] text-white rounded p-3 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

        <p className="text-xs text-[var(--muted)] text-center">
          No right or wrong answers. This helps us guide you better.
        </p>
      </div>
    </div>
  );
}
