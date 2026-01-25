"use client";

import { Suspense, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ redirect support
  const redirectTo = searchParams.get("redirect") || "/role";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-6 space-y-5 text-[var(--text)]">
        <h1 className="text-2xl font-bold text-center text-[var(--text)]">
          Create your account
        </h1>

        <input
          type="email"
          placeholder="Email"
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
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline text-[var(--primary)]">
            Sign in
          </Link>
        </p>

        <p className="text-xs text-[var(--muted)] text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 text-[var(--muted)]">
          Loading signup...
        </p>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
