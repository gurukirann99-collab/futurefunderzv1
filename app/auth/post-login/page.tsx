"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PostLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }

      const userId = data.user.id;
      const intent = localStorage.getItem("intent");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, onboarding_completed")
        .eq("user_id", userId)
        .single();

      // 🧠 AUTO ROLE FROM INTENT
      if (!profile?.role && intent) {
        let role = "student";

        if (intent === "explore_schools") role = "parent";
        if (intent === "explore_entrepreneur") role = "entrepreneur";

        await supabase
          .from("profiles")
          .update({ role })
          .eq("user_id", userId);

        router.replace("/onboarding");
        return;
      }

      // Normal flow
      if (!profile?.role) {
        router.replace("/role");
        return;
      }

      if (!profile.onboarding_completed) {
        router.replace("/onboarding");
        return;
      }

      router.replace("/");
    };

    run();
  }, [router]);

  return <p className="p-6">Redirecting…</p>;
}
