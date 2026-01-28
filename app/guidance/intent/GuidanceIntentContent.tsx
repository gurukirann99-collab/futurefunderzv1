"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

/* ================= CONTENT ================= */

export default function GuidanceIntentContent() {
  const params = useSearchParams();
  const router = useRouter();
  const domain = params.get("domain");

  const [clarity, setClarity] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | null>(null);

  function submit() {
    localStorage.setItem(
      "pendingGuidance",
      JSON.stringify({ domain, clarity, interest })
    );

    router.push("/guidance/path");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full bg-[var(--card)] border border-[var(--border)]
                      p-6 rounded-2xl shadow space-y-6">

        <h1 className="text-xl font-bold text-center">
          Let’s personalise your guidance
        </h1>

        {/* ===== CLARITY ===== */}
        {!clarity && (
          <>
            <p className="text-sm text-[var(--muted)]">
              How clear do you feel right now?
            </p>

            <Option label="😕 Very confused" onClick={() => setClarity("confused")} />
            <Option label="🙂 Somewhat clear" onClick={() => setClarity("partial")} />
            <Option label="😃 Very clear" onClick={() => setClarity("clear")} />
          </>
        )}

        {/* ===== JOBS ===== */}
        {clarity && domain === "jobs" && !interest && (
          <>
            <p className="text-sm text-[var(--muted)]">
              Which kind of roles interest you?
            </p>

            <Option label="💻 Tech & Data" onClick={() => setInterest("tech")} />
            <Option label="📊 Business & Ops" onClick={() => setInterest("business")} />
            <Option label="🎨 Creative" onClick={() => setInterest("creative")} />
            <Option label="🧪 Core / Domain" onClick={() => setInterest("domain")} />
            <Option label="🤔 Not sure yet" onClick={() => setInterest("unsure")} />
          </>
        )}

        {/* ===== SKILLS ===== */}
        {clarity && domain === "skills" && !interest && (
          <>
            <p className="text-sm text-[var(--muted)]">
              What kind of skills are you looking for?
            </p>

            <Option label="💻 Tech / Digital" onClick={() => setInterest("tech")} />
            <Option label="📊 Business" onClick={() => setInterest("business")} />
            <Option label="🎨 Creative" onClick={() => setInterest("creative")} />
            <Option label="🛠️ Vocational" onClick={() => setInterest("vocational")} />
            <Option label="🤔 Not sure yet" onClick={() => setInterest("unsure")} />
          </>
        )}

        {/* ===== SUBMIT ===== */}
        {clarity &&
          (
            domain === "schools" ||
            domain === "colleges" ||
            interest
          ) && (
            <button
              onClick={submit}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-xl"
            >
              See my path →
            </button>
          )}

      </div>
    </div>
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
                 rounded-xl p-3 hover:bg-[var(--bg)] transition"
    >
      {label}
    </button>
  );
}
