"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
      setLoading(false);
    });

    // Listen to auth changes (THIS IS THE FIX)
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

  if (loading) return null; // prevent flash

  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-bold">
        FutureFunderz
      </Link>

      <div className="flex items-center gap-4 text-sm">
        {!loggedIn && (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Sign up
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={logout}
              className="border px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
