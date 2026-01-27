"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resendVerification = async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setMessage("Unable to find your email. Please login again.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Verification email sent. Please check your inbox.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl space-y-4 text-center text-[var(--text)] shadow">
        <h1 className="text-2xl font-bold">
          Verify your email
        </h1>

        <p className="text-sm text-[var(--muted)]">
          To continue with mentorship features, please verify your email address.
        </p>

        {message && (
          <p className="text-sm text-[var(--primary)]">
            {message}
          </p>
        )}

        <button
          onClick={resendVerification}
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>

        <button
          onClick={() => router.push("/rule")}
          className="w-full border border-[var(--border)] py-2 rounded hover:bg-[var(--bg)]"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
