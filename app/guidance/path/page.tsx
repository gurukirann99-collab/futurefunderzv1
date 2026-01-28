"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface GuidanceData {
  domain: string;
  clarity: string;
  interest?: string;
}

export default function GuidancePathPage() {
  const router = useRouter();
  const [data, setData] = useState<GuidanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("pendingGuidance");

    if (!saved) {
      // Safety: if user lands here directly
      router.replace("/guidance/explore");
      return;
    }

    const parsed = JSON.parse(saved);
    setData(parsed);
    setLoading(false);
  }, [router]);

  function continueToDashboard() {
    // Clear temporary guidance state
    localStorage.removeItem("pendingGuidance");

    // Move user forward
    router.push("/student/dashboard");
  }

  if (loading || !data) {
    return <p className="p-8 text-center">Preparing your path…</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 space-y-6">

      <h1 className="text-2xl font-bold text-center">
        Your personalised path
      </h1>

      <div className="bg-[var(--card)] border border-[var(--border)]
                      rounded-xl p-6 space-y-3">

        <p className="text-sm text-[var(--muted)]">
          You’re exploring:
          <strong className="ml-1 capitalize">{data.domain}</strong>
        </p>

        <p className="text-sm text-[var(--muted)]">
          Your clarity level:
          <strong className="ml-1 capitalize">{data.clarity}</strong>
        </p>

        {data.interest && (
          <p className="text-sm text-[var(--muted)]">
            Interest area:
            <strong className="ml-1 capitalize">{data.interest}</strong>
          </p>
        )}
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-[var(--muted)]">
          We’ll now guide you with the right actions and recommendations.
        </p>

        <button
          onClick={continueToDashboard}
          className="w-full bg-[var(--primary)]
                     text-white py-3 rounded-xl
                     font-medium hover:opacity-90"
        >
          Continue to dashboard →
        </button>
      </div>

    </div>
  );
}
