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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendLink = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo}`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-6 space-y-5 text-[var(--text)]">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-[var(--muted)]">
            Login securely using your email
          </p>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("Check")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={sendLink}
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-2.5 rounded hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>

        <p className="text-xs text-center text-[var(--muted)]">
          No password required
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
