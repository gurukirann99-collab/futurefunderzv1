"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MentorProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAccessAndExisting = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (profile?.role !== "mentor") {
        router.push("/mentor/dashboard");
        return;
      }

      const { data } = await supabase
        .from("mentor_profiles")
        .select("id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (data) {
        router.push("/dashboard");
      }
    };

    checkAccessAndExisting();
  }, [router]);

  const saveProfile = async () => {
    if (loading) return;

    if (!fullName || !expertise || !experience || !availability) {
      setError("Please fill all fields.");
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

    const { error } = await supabase.from("mentor_profiles").insert({
      user_id: session.user.id,
      full_name: fullName,
      expertise,
      experience_years: Number(experience),
      availability,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-4 shadow text-[var(--text)]">
        <h1 className="text-2xl font-bold text-center">
          Mentor Profile
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Area of Expertise (e.g. Startup, Career, Finance)"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />

        <input
          type="number"
          placeholder="Years of Experience"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <select
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Availability</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
          <option value="both">Both</option>
        </select>

        {error && (
          <p className="text-[rgb(239,68,68)] text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          onClick={saveProfile}
          className="w-full bg-[var(--primary)] text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
