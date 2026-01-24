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
    <div className="p-6 max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Edit Mentor Profile</h1>

      <input value={fullName} onChange={e => setFullName(e.target.value)} className="border p-2 w-full" />
      <input value={expertise} onChange={e => setExpertise(e.target.value)} className="border p-2 w-full" />
      <input value={experience} onChange={e => setExperience(e.target.value)} className="border p-2 w-full" />
      <select value={availability} onChange={e => setAvailability(e.target.value)} className="border p-2 w-full">
        <option value="weekdays">Weekdays</option>
        <option value="weekends">Weekends</option>
        <option value="both">Both</option>
      </select>

      <button onClick={updateProfile} className="border px-4 py-2 rounded">
        Save Changes
      </button>
    
    </div>
  );
}
