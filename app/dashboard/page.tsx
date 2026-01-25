"use client";

import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    const routeUser = async () => {
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

      if (!profile?.role) {
        router.replace("/role");
        return;
      }

      // 🔀 Role routing
      if (profile.role === "student") {
        router.replace("/dashboard/student");
      } else if (profile.role === "mentor") {
        router.replace("/dashboard/mentor");
      } else if (profile.role === "entrepreneur") {
        router.replace("/dashboard/entrepreneur");
      } else if (profile.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/login");
      }
    };

    routeUser();
  }, [router]);

  return <p className="p-8">Redirecting to dashboard...</p>;
}
