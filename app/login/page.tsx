"use client";

import { Suspense, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-6 space-y-5 text-[var(--text)]">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Continue your journey from career to work
          </p>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-[rgb(239,68,68)] text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-2.5 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center text-[var(--muted)]">
          New here?{" "}
          <Link
            href="/signup"
            className="underline text-[var(--primary)]"
          >
            Create an account
          </Link>
        </p>

        <p className="text-xs text-[var(--muted)] text-center">
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
          Loading...
        </p>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
