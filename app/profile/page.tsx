"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
  full_name: string | null;
  education_level: string | null;
  dob: string | null;
  role: string | null;
  created_at: string | null;
};

export default function ProfileSettingsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({
    full_name: null,
    education_level: null,
    dob: null,
    role: null,
    created_at: null,
  });

  const [email, setEmail] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  /* ===============================
     LOAD PROFILE
  =============================== */
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/auth/login");
        return;
      }

      setEmail(session.user.email || null);

      if (session.user.last_sign_in_at) {
        setLastLogin(
          new Date(session.user.last_sign_in_at).toLocaleString()
        );
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, education_level, dob, role, created_at")
        .eq("id", session.user.id)
        .single();

      if (data) setProfile(data);

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  /* ===============================
     SAVE PROFILE
  =============================== */
  const saveProfile = async () => {
    setSaving(true);
    setMessage(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        education_level: profile.education_level,
        dob: profile.dob,
      })
      .eq("id", session.user.id);

    if (error) {
      setMessage("Failed to save changes.");
    } else {
      setMessage("Profile updated successfully.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <p className="p-6 text-[var(--muted)]">
        Loading profile settings...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-[var(--text)]">
      <h1 className="text-2xl font-bold">Profile Settings</h1>

      {/* BASIC INFO */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Basic Information</h2>

        <input
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={profile.full_name || ""}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
        />

        <input
          placeholder="Education Level"
          className="w-full border p-2 rounded"
          value={profile.education_level || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              education_level: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={profile.dob || ""}
          onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })
          }
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {message && (
          <p className="text-sm text-[var(--muted)]">
            {message}
          </p>
        )}
      </section>

      {/* ACCOUNT INFO */}
      <section className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-2 text-sm">
        <h2 className="font-semibold">Account Information</h2>

        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          <span className="capitalize">{profile.role}</span>
        </p>
        <p>
          <strong>Account created:</strong>{" "}
          {profile.created_at
            ? new Date(profile.created_at).toDateString()
            : "-"}
        </p>
        <p>
          <strong>Last login:</strong> {lastLogin || "-"}
        </p>
      </section>
    </div>
  );
}
