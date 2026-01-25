"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    };

    check();
  }, [router]);

  const selectRole = async (
    role: "student" | "entrepreneur" | "mentor"
  ) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase
      .from("profiles")
      .update({ role })
      .eq("user_id", session.user.id);

    router.push("/dashboard");
  };

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-xl w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-6 text-[var(--text)] shadow">
        <h1 className="text-2xl font-bold text-center">
          Choose your role
        </h1>

        <p className="text-sm text-center text-[var(--muted)]">
          You can explore other roles later.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => selectRole("student")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🎓 Student
            <p className="text-sm text-[var(--muted)]">
              Learn skills, work on projects, apply for jobs
            </p>
          </button>

          <button
            onClick={() => selectRole("entrepreneur")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🚀 Entrepreneur
            <p className="text-sm text-[var(--muted)]">
              Build a business (coming soon)
            </p>
          </button>

          <button
            onClick={() => selectRole("mentor")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🧠 Mentor
            <p className="text-sm text-[var(--muted)]">
              Guide learners (coming soon)
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
