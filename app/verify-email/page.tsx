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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full border p-6 rounded space-y-4 text-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>

        <p className="text-sm text-gray-600">
          To continue with mentorship features, please verify your email address.
        </p>

        {message && (
          <p className="text-sm text-blue-600">{message}</p>
        )}

        <button
          onClick={resendVerification}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full border py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
