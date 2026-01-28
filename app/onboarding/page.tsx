"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_completed")
        .eq("user_id", data.user.id)
        .single();

      if (!profile) {
        router.replace("/role");
        return;
      }

      // Already onboarded → go to dashboard
      if (profile.onboarding_completed) {
        router.replace("/");
        return;
      }

      setRole(profile.role);
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const completeOnboarding = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) return;

    await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("user_id", data.user.id);

    router.replace("/");
  };

  if (loading) {
    return <p className="p-6">Loading onboarding…</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to FutureFunderz
      </h1>

      <p className="text-[var(--muted)] mb-6">
        Just one step before we get you started.
      </p>

      {/* ROLE CONFIRMATION */}
      <div className="border rounded-xl p-6 bg-[var(--card)] mb-6">
        <p className="text-sm text-[var(--muted)] mb-2">
          You’re continuing as:
        </p>
        <p className="font-semibold capitalize">
          {role}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={completeOnboarding}
        className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-medium"
      >
        Continue to dashboard →
      </button>
    </div>
  );
}
