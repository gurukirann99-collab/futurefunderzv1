"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ROLE_CAPABILITIES } from "@/lib/modeConfig";
import { routeByActiveMode } from "@/lib/routeByActiveMode";

type Profile = {
  role: string;
  active_mode: string | null;
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  /* ===============================
     LOAD USER + PROFILE (STABLE)
  =============================== */
  useEffect(() => {
    const loadAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        setProfile(null);
        setLastLogin(null);
        setLoading(false);
        return;
      }

      const user = data.user;

      const { data: p } = await supabase
        .from("profiles")
        .select("role, active_mode")
        .eq("user_id", user.id)
        .single();

      if (!p || !p.role) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // ✅ Safe default for active_mode
      if (!p.active_mode) {
        await supabase
          .from("profiles")
          .update({ active_mode: "dashboard" })
          .eq("user_id", user.id);

        p.active_mode = "dashboard";
      }

      setProfile(p);

      // Last login (safe)
      if (user.last_sign_in_at) {
        const date = new Date(user.last_sign_in_at);
        setLastLogin(
          `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );
      }

      setLoading(false);
    };

    loadAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => loadAuth());

    return () => subscription.unsubscribe();
  }, []);

  /* ===============================
     LOGOUT (FULL RED)
  =============================== */
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  if (loading) return null;

  const linkClass = (href: string) =>
    `text-sm ${
      pathname === href
        ? "text-[var(--primary)] font-medium"
        : "text-[var(--muted)] hover:text-[var(--text)]"
    }`;

  // ✅ Dashboard is MODE HOME
  const dashboardHref = profile
    ? routeByActiveMode(profile.role, profile.active_mode)
    : "/auth/login";

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* BRAND */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-bold text-lg text-[var(--text)]">
            FutureFunderz
          </span>
          <span className="text-xs text-[var(--muted)]">
            Career → Learning → Work
          </span>
        </Link>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-6">
          {/* LOGGED OUT */}
          {!profile && (
            <>
              <Link href="/auth/login" 
              
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
              >
              Login
              </Link>

              <Link
                href="/auth/login?intent=signup"
                className="text-sm bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {profile && (
            <>
              {/* DASHBOARD */}
              <Link href={dashboardHref} className={linkClass(dashboardHref)}>
                Dashboard
              </Link>

              {/* PROFILE */}
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>

              {/* MODE SWITCH */}
              {ROLE_CAPABILITIES[profile.role]?.length > 1 && (
                <select
                  value={profile.active_mode || "dashboard"}
                  onChange={async (e) => {
                    const mode = e.target.value;
                    const { data } = await supabase.auth.getUser();
                    if (!data?.user) return;

                    await supabase
                      .from("profiles")
                      .update({ active_mode: mode })
                      .eq("user_id", data.user.id);

                    router.replace(
                      routeByActiveMode(profile.role, mode)
                    );
                  }}
                  className="border px-2 py-1 rounded text-xs bg-[var(--bg)]"
                >
                  {ROLE_CAPABILITIES[profile.role].map((m) => (
                    <option key={m} value={m}>
                      {m.toUpperCase()}
                    </option>
                  ))}
                </select>
              )}

              {/* ROLE INFO */}
              <div className="text-right leading-tight">
                <span className="text-xs font-medium text-[var(--primary)] capitalize">
                  {profile.role} · {profile.active_mode}
                </span>
                {lastLogin && (
                  <div className="text-[10px] text-[var(--muted)]">
                    Last login: {lastLogin}
                  </div>
                )}
              </div>

              {/* 🔴 FULL RED LOGOUT */}
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
