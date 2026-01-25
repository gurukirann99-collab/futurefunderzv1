"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return null;

  const linkClass = (href: string) =>
    `text-sm ${
      pathname === href
        ? "text-[var(--primary)] font-medium"
        : "text-[var(--muted)] hover:text-[var(--text)]"
    }`;

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-bold text-lg text-[var(--text)]">
            FutureFunderz
          </span>
          <span className="text-xs text-[var(--muted)]">
            Career → Learning → Work
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {!loggedIn && (
            <>
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}

          {loggedIn && (
            <>
              <Link href="/dashboard" className={linkClass("/dashboard")}>
                Dashboard
              </Link>

              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>

              <button
                onClick={logout}
                className="text-sm text-[var(--muted)] hover:text-[var(--text)] border border-[var(--border)] px-3 py-1.5 rounded hover:bg-[var(--card)] transition"
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
