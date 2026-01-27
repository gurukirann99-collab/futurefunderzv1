"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [id]);

  if (!profile) return null;

  const save = async () => {
    await supabase
      .from("profiles")
      .update({
        role: profile.role,
        email_verified: profile.email_verified,
      })
      .eq("user_id", id);

    router.push("/admin/users");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Manage User</h1>

      <p className="text-sm text-[var(--muted)]">
        User ID: {id}
      </p>

      <input
        className="w-full border p-2 rounded"
        placeholder="Full name"
        value={profile.full_name || ""}
        disabled
      />

      <select
        className="w-full border p-2 rounded"
        value={profile.role}
        onChange={(e) =>
          setProfile({ ...profile, role: e.target.value })
        }
      >
        <option value="student">Student</option>
        <option value="entrepreneur">Entrepreneur</option>
        <option value="mentor">Mentor</option>
        <option value="parent">Parent</option>
        <option value="partner">Partner</option>
        <option value="admin">Admin</option>
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={profile.email_verified}
          onChange={(e) =>
            setProfile({
              ...profile,
              email_verified: e.target.checked,
            })
          }
        />
        Email Verified
      </label>

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
