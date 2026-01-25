"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewMentorProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);


// AFTER loading profile + BEFORE main return
if (profile && profile.email_verified === false) {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-2">
        Email verification required
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Please verify your email to access mentorship features.
      </p>
      <Link href="/verify-email" className="underline">
        Verify Email
      </Link>
    </div>
  );
}

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
        .maybeSingle();

      if (!data) {
        router.push("/mentor/profile");
        return;
      }

      setProfile(data);
    };

    loadProfile();
  }, [router]);

  if (!profile) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="p-6 max-w-md space-y-4">
           <h1 className="text-2xl font-bold flex items-center">
            {profile.full_name}
            {profile.is_verified && (
            <span className="text-green-600 text-xs ml-2">
            ✔ Verified Mentor </span>)}</h1>
              
      <div className="border p-4 rounded space-y-2">
        <p><b>Name:</b> {profile.full_name}</p>
        <p><b>Expertise:</b> {profile.expertise}</p>
        <p><b>Experience:</b> {profile.experience_years} years</p>
        <p><b>Availability:</b> {profile.availability}</p>
      </div>
        
      <Link
        href="/mentor/profile/edit"
        className="block border px-4 py-2 rounded text-center"
      >
        Edit Profile
      </Link>
    <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-4 border py-2 rounded"
        >
          Back to Dashboard
        </button> 
    </div>
    
  );
}
