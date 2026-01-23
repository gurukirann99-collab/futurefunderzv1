"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectRole = async (role: string) => {
    setLoading(true);
    setError("");

    // 1️⃣ Get active session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      setError("Session not ready. Please refresh once.");
      setLoading(false);
      return;
    }

    const user = session.user;

    // 2️⃣ Save role in profiles table
    const { error: dbError } = await supabase.from("profiles").upsert({
      user_id: user.id,
      role,
      onboarding_completed: true,
    });

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
      return;
    }

    // 3️⃣ Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">
          Select your role
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          onClick={() => selectRole("student")}
          className="w-full border py-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          🎓 Student
        </button>

        <button
          disabled={loading}
          onClick={() => selectRole("entrepreneur")}
          className="w-full border py-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          🚀 Entrepreneur
        </button>

        <button
          disabled={loading}
          onClick={() => selectRole("mentor")}
          className="w-full border py-2 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          🧠 Mentor
        </button>
      </div>
    </div>
  );
}
