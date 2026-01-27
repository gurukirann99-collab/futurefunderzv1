"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  allowedRole?: string;
};

export default function RoleLayout({ children, allowedRole }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data, error } = await supabase.auth.getUser();

      // ❌ truly NOT logged in
      if (error || !data?.user) {
        router.replace("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", data.user.id)
        .single();

      // ❌ profile missing or role missing
      if (!profile || !profile.role) {
        router.replace("/role");
        return;
      }

      setRole(profile.role);
      setLoading(false);
    };

    check();
  }, [router]);

  useEffect(() => {
    if (loading) return;

    // ❌ role restricted and mismatch
    if (allowedRole && role !== allowedRole) {
      router.replace("/dashboard");
    }
  }, [loading, role, allowedRole, router]);

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
