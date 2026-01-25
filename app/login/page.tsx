"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Preserve original destination
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // ✅ Redirect back to intended page
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6 space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600">
            Continue your journey from career to work
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Signup link */}
        <p className="text-sm text-center text-gray-500">
          New here?{" "}
          <Link href="/signup" className="underline">
            Create an account
          </Link>
        </p>

        {/* Legal */}
        <p className="text-xs text-gray-400 text-center">
          <Link href="/privacy" className="underline">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>
        </p>
      </div>
    </div>
  );
}
