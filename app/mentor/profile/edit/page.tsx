"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function EditMentorProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("mentor_profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      setFullName(data.full_name);
      setExpertise(data.expertise);
      setExperience(String(data.experience_years));
      setAvailability(data.availability);
    };

    loadProfile();
  }, [router]);

  const updateProfile = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    await supabase
      .from("mentor_profiles")
      .update({
        full_name: fullName,
        expertise,
        experience_years: Number(experience),
        availability,
      })
      .eq("user_id", session!.user.id);

    router.push("/mentor/profile/view");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-4 shadow text-[var(--text)]">
        <h1 className="text-2xl font-bold">
          Edit Mentor Profile
        </h1>

        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
          <option value="both">Both</option>
        </select>

        <button
          onClick={updateProfile}
          className="w-full bg-[var(--primary)] text-white py-2 rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
