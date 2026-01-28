"use client";

import { useRouter } from "next/navigation";

export default function ExploreHub() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full bg-[var(--card)]
                      border border-[var(--border)]
                      p-6 rounded-2xl shadow space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Explore on your own
        </h1>

        <p className="text-sm text-[var(--muted)] text-center">
          Browse freely. No questions.
        </p>

        <Option label="🏫 Schools" onClick={() => router.push("/explore/schools")} />
        <Option label="🎓 Colleges" onClick={() => router.push("/explore/colleges")} />
        <Option label="📘 Skills" onClick={() => router.push("/explore/skills")} />
        <Option label="💼 Jobs" onClick={() => router.push("/explore/jobs")} />
      </div>
    </div>
  );
}

function Option({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-[var(--border)]
                 rounded-xl p-4 hover:bg-[var(--bg)]"
    >
      {label}
    </button>
  );
}
