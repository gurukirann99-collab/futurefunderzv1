"use client";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EntrepreneurDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profile?.role !== "entrepreneur") {
        router.replace("/dashboard");
        return;
      }
    };

    checkRole();
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--bg)] p-8 text-[var(--text)]">
      <h1 className="text-2xl font-bold">
        Entrepreneur Dashboard
      </h1>

      <p className="text-sm text-[var(--muted)] mt-1">
        Entrepreneur tools will appear here.
      </p>
    </div>
  );
}
