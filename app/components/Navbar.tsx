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
    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setLoading(false);
    });

    // Listen to auth changes
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
        ? "text-blue-600 font-medium"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-bold text-lg">
            FutureFunderz
          </span>
          <span className="text-xs text-gray-500">
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
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
                className="text-sm text-gray-500 hover:text-gray-800 border px-3 py-1.5 rounded hover:bg-gray-100 transition"
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
