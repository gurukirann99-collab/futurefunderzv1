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
    const checkExisting = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("mentor_profiles")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

      if (data && data.length > 0) {
        router.push("/dashboard");
      }
    };

    checkExisting();
  }, [router]);

  const saveProfile = async () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Mentor Profile
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Area of Expertise (e.g. Startup, Career, Finance)"
          className="w-full border p-2 rounded"
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
        />

        <input
          type="number"
          placeholder="Years of Experience"
          className="w-full border p-2 rounded"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">Availability</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
          <option value="both">Both</option>
        </select>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          onClick={saveProfile}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
