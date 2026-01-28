"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/* ================= INNER CONTENT ================= */
function GuidanceExploreContent() {
  const params = useSearchParams();
  const router = useRouter();
  const domain = params.get("domain");

  function go(nextDomain: string) {
    router.push(`/guidance/discovery?domain=${nextDomain}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div
        className="max-w-md w-full bg-[var(--card)]
                   border border-[var(--border)]
                   p-6 rounded-2xl shadow space-y-6"
      >

        {/* ================= HERO ENTRY ================= */}
        {!domain && (
          <>
            <h1 className="text-2xl font-bold text-center">
              What do you want clarity on?
            </h1>

            <p className="text-sm text-[var(--muted)] text-center">
              Choose one. We’ll guide you step by step.
            </p>

            <Option label="🏫 School admissions" onClick={() => go("schools")} />
            <Option label="🎓 College decisions" onClick={() => go("colleges")} />
            <Option label="💼 Career / jobs" onClick={() => go("jobs")} />
            <Option label="📘 Skills to learn" onClick={() => go("skills")} />
            <Option
              label="🤔 I’m confused, need counselling"
              onClick={() => router.push("/guidance/confused")}
            />
          </>
        )}

        {/* ================= DOMAIN ENTRY ================= */}
        {domain === "schools" && (
          <>
            <h1 className="text-xl font-bold text-center">
              What about schools do you need clarity on?
            </h1>

            <Option
              label="🏫 Which school is best for my child"
              onClick={() => go("schools")}
            />
            <Option
              label="📋 Admission chances & process"
              onClick={() => go("schools")}
            />
            <Option
              label="🤔 I need a counsellor"
              onClick={() =>
                router.push("/guidance/confused?domain=schools")
              }
            />
          </>
        )}

        {domain === "colleges" && (
          <>
            <h1 className="text-xl font-bold text-center">
              What about colleges do you need clarity on?
            </h1>

            <Option
              label="🎓 Choosing the right college"
              onClick={() => go("colleges")}
            />
            <Option
              label="📊 Compare ROI & placements"
              onClick={() => go("colleges")}
            />
            <Option
              label="🌍 Study abroad vs India"
              onClick={() => go("colleges")}
            />
            <Option
              label="🤔 I need a counsellor"
              onClick={() =>
                router.push("/guidance/confused?domain=colleges")
              }
            />
          </>
        )}

        {domain === "jobs" && (
          <>
            <h1 className="text-xl font-bold text-center">
              What about careers do you need clarity on?
            </h1>

            <Option
              label="💼 Roles that suit me"
              onClick={() => go("jobs")}
            />
            <Option
              label="📈 Growth & salary paths"
              onClick={() => go("jobs")}
            />
            <Option
              label="🔁 Career switch"
              onClick={() => go("jobs")}
            />
            <Option
              label="🤔 I need a counsellor"
              onClick={() =>
                router.push("/guidance/confused?domain=jobs")
              }
            />
          </>
        )}

        {domain === "skills" && (
          <>
            <h1 className="text-xl font-bold text-center">
              What about skills do you need clarity on?
            </h1>

            <Option
              label="📘 Skills for jobs"
              onClick={() => go("skills")}
            />
            <Option
              label="🚀 Skills for business"
              onClick={() => go("skills")}
            />
            <Option
              label="🤔 I need a counsellor"
              onClick={() =>
                router.push("/guidance/confused?domain=skills")
              }
            />
          </>
        )}

      </div>
    </div>
  );
}

/* ================= SUSPENSE WRAPPER ================= */
export default function GuidanceExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[var(--muted)]">
          Loading guidance…
        </div>
      }
    >
      <GuidanceExploreContent />
    </Suspense>
  );
}

/* ================= OPTION ================= */
function Option({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-[var(--border)]
                 rounded-xl p-4 hover:bg-[var(--bg)] transition"
    >
      {label}
    </button>
  );
}
