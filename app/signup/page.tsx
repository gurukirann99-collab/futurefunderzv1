"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!agreed) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

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

    router.push("/role");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow p-6 space-y-5 text-[var(--text)]">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Start your journey from career to work
          </p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-[var(--border)] bg-[var(--bg)] p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[var(--border)] bg-[var(--bg)] p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Terms */}
        <label className="flex items-start gap-2 text-sm text-[var(--muted)]">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 accent-[var(--primary)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="underline text-[var(--text)]">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline text-[var(--text)]">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Error */}
        {error && (
          <p className="text-[rgb(239,68,68)] text-sm text-center">
            {error}
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-2.5 rounded hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-[var(--muted)]">
          Already have an account?{" "}
          <Link href="/login" className="underline text-[var(--text)]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
