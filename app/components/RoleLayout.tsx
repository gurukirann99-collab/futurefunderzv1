"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  allowedRole: string;
};

export default function RoleLayout({ children, allowedRole }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (!profile || profile.role !== allowedRole) {
        router.replace("/role");
        return;
      }

      setLoading(false);
    };

    checkRole();
  }, [router, allowedRole]);

  if (loading) return null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-[var(--bg)]">
        {children}
      </main>
    </div>
  );
}
