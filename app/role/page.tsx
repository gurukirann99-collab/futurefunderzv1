"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Role =
  | "student"
  | "parent"
  | "partner"
  | "entrepreneur"
  | "mentor";

export default function RolePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  const selectRole = async (role: Role) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    // IMPORTANT: profiles PK is `id`, not `user_id`
    await supabase
      .from("profiles")
      .update({ role })
      .eq("id", session.user.id);

    // Role-based redirect
    switch (role) {
      case "student":
        router.push("/student/dashboard");
        break;
      case "parent":
        router.push("/parent/dashboard");
        break;
      case "partner":
        router.push("/partner/dashboard");
        break;
      case "entrepreneur":
        router.push("/entrepreneur/dashboard");
        break;
      case "mentor":
        router.push("/mentor/dashboard");
        break;
      default:
        router.push("/");
    }
  };

  if (loading) {
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading...
      </p>
    );
  }

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
              Learn skills, internships, jobs
            </p>
          </button>

          <button
            onClick={() => selectRole("parent")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            👨‍👩‍👧 Parent
            <p className="text-sm text-[var(--muted)]">
              Track child progress & education decisions
            </p>
          </button>

          <button
            onClick={() => selectRole("partner")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🤝 Partner
            <p className="text-sm text-[var(--muted)]">
              Institutes, NGOs, training partners
            </p>
          </button>

          <button
            onClick={() => selectRole("entrepreneur")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🚀 Entrepreneur
            <p className="text-sm text-[var(--muted)]">
              Build startups & access funding (soon)
            </p>
          </button>

          <button
            onClick={() => selectRole("mentor")}
            className="w-full border border-[var(--border)] rounded-xl p-4 text-left hover:bg-[var(--bg)] transition"
          >
            🧠 Mentor
            <p className="text-sm text-[var(--muted)]">
              Guide students & founders
            </p>
          </button>

        </div>
      </div>
    </div>
  );
}
