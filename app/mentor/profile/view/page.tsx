"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ViewMentorProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

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

  if (!profile)
    return (
      <p className="p-6 bg-[var(--bg)] text-[var(--muted)]">
        Loading profile...
      </p>
    );

  // 🔐 Email verification gate
  if (profile.email_verified === false) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-8 text-[var(--text)]">
        <div className="max-w-md bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow space-y-4 text-center">
          <h2 className="text-xl font-bold">
            Email verification required
          </h2>
          <p className="text-sm text-[var(--muted)]">
            Please verify your email to access mentorship features.
          </p>
          <Link
            href="/verify-email"
            className="text-[var(--primary)] underline"
          >
            Verify Email
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 flex justify-center">
      <div className="max-w-md w-full space-y-4 text-[var(--text)]">
        <h1 className="text-2xl font-bold flex items-center">
          {profile.full_name}
          {profile.is_verified && (
            <span className="text-[rgb(34,197,94)] text-xs ml-2">
              ✔ Verified Mentor
            </span>
          )}
        </h1>

        <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-xl space-y-2">
          <p><b>Name:</b> {profile.full_name}</p>
          <p><b>Expertise:</b> {profile.expertise}</p>
          <p><b>Experience:</b> {profile.experience_years} years</p>
          <p><b>Availability:</b> {profile.availability}</p>
        </div>

        <Link
          href="/mentor/profile/edit"
          className="block border border-[var(--border)] px-4 py-2 rounded text-center hover:bg-[var(--card)]"
        >
          Edit Profile
        </Link>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-2 border border-[var(--border)] py-2 rounded hover:bg-[var(--card)]"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
