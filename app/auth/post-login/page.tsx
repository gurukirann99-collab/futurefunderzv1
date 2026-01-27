"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { routeByActiveMode } from "@/lib/routeByActiveMode";

export default function PostLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_completed, active_mode")
        .eq("user_id", data.user.id)
        .single();

      // No role yet
      if (!profile || !profile.role) {
        router.replace("/role");
        return;
      }

      // Onboarding not completed
      if (!profile.onboarding_completed) {
        router.replace("/onboarding");
        return;
      }

      // 🔥 Intelligent redirect
      const target = routeByActiveMode(
        profile.role,
        profile.active_mode
      );

      router.replace(target);
    };

    redirectUser();
  }, [router]);

  return <p className="p-6">Redirecting…</p>;
}
