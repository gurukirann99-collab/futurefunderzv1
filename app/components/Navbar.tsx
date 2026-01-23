"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="w-full border-b px-6 py-3 flex items-center justify-between">
      <Link href={loggedIn ? "/dashboard" : "/"} className="font-bold text-lg">
        FutureFunderz
      </Link>

      <div className="flex items-center gap-4">
        {!loggedIn && (
          <>
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-sm hover:underline">
              Sign up
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link href="/dashboard" className="text-sm hover:underline">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
