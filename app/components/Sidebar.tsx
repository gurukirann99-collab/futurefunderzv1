"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sidebarConfig } from "./sidebarConfig";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      // ✅ STABLE AUTH CHECK
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }

      const userId = data.user.id;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error || !profile?.role) {
        router.replace("/role");
        return;
      }

      setRole(profile.role);
      setLoading(false);
    };

    loadRole();
  }, [router]);

  if (loading || !role) return null;

  const config = sidebarConfig[role];
  if (!config) return null;

  return (
    <aside className="w-64 bg-[var(--bg)] border-r border-[var(--border)] fixed inset-y-0 left-0 flex flex-col">
      {/* BRAND */}
      <div className="px-6 py-5 border-b border-[var(--border)]">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text)]">
          FutureFunderz
        </h2>
        <p className="text-xs text-[var(--muted)]">
          Career → Learning → Work
        </p>
      </div>

      {/* MAIN NAV */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        {config.main.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active
                  ? "bg-[var(--primary)]/15 text-[var(--primary)] font-medium"
                  : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--text)]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* SECONDARY NAV */}
      {config.secondary && (
        <div className="px-4 py-4 border-t border-[var(--border)] text-sm space-y-2">
          {config.secondary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-md text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}
