"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ROLE_MODES } from "@/lib/modeConfig";

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
     LOAD SESSION + PROFILE
  =============================== */
  useEffect(() => {
    const loadAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setProfile(null);
        setLastLogin(null);
        setLoading(false);
        return;
      }

      // ✅ CORRECT COLUMN: user_id (not id)
      const { data: p } = await supabase
        .from("profiles")
        .select("role, active_mode")
        .eq("user_id", session.user.id)
        .single();

      if (!p) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // ✅ Ensure active_mode exists
      if (!p.active_mode) {
        await supabase
          .from("profiles")
          .update({ active_mode: p.role })
          .eq("user_id", session.user.id);

        p.active_mode = p.role;
      }

      setProfile(p);

      // Last login
      if (session.user.last_sign_in_at) {
        const date = new Date(session.user.last_sign_in_at);
        setLastLogin(
          date.toLocaleDateString() +
            " " +
            date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
        );
      }

      setLoading(false);
    };

    loadAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ===============================
     LOGOUT
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

  // Dashboard always routes by MODE, not role
  const dashboardHref = profile
    ? `/${profile.active_mode}/dashboard`
    : "/role";

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
              <Link href="/auth/login" className={linkClass("/auth/login")}>
                Login
              </Link>

              <Link
                href="/auth/signup"
                className="text-sm bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {profile && (
            <>
              {/* Dashboard */}
              <Link href={dashboardHref} className={linkClass(dashboardHref)}>
                Dashboard
              </Link>

              {/* Profile */}
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>

              {/* MODE SWITCH (ONLY IF MULTIPLE MODES) */}
              {ROLE_MODES[profile.role]?.length > 1 && (
                <select
                  value={profile.active_mode || profile.role}
                  onChange={async (e) => {
                    const mode = e.target.value;

                    await supabase
                      .from("profiles")
                      .update({ active_mode: mode })
                      .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

                    window.location.reload();
                  }}
                  className="border px-2 py-1 rounded text-xs bg-[var(--bg)]"
                >
                  {ROLE_MODES[profile.role].map((m) => (
                    <option key={m} value={m}>
                      {m.toUpperCase()} MODE
                    </option>
                  ))}
                </select>
              )}

              {/* ROLE + LAST LOGIN */}
              <div className="text-right leading-tight">
                <span className="text-xs font-medium text-[var(--primary)] capitalize">
                  {profile.role} / {profile.active_mode}
                </span>
                {lastLogin && (
                  <div className="text-[10px] text-[var(--muted)]">
                    Last login: {lastLogin}
                  </div>
                )}
              </div>

              {/* LOGOUT (RED) */}
              <button
                onClick={logout}
                className="text-sm text-red-600 border border-red-300 px-3 py-1.5 rounded hover:bg-red-50 transition"
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
