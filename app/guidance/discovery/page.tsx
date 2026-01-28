"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import JobsExplorer from "@/app/components/explorers/JobsExplorer";
import SchoolsExplorer from "@/app/components/explorers/SchoolsExplorer";
import CollegesExplorer from "@/app/components/explorers/CollegesExplorer";
import SkillsExplorer from "@/app/components/explorers/SkillsExplorer";

import { getJobs } from "@/app/components/hooks/useJobs";
import { getSchools } from "@/app/components/hooks/useSchools";
import { getColleges } from "@/app/components/hooks/useColleges";
import { getSkills } from "@/app/components/hooks/useSkills";

/* ================= INNER CONTENT ================= */
function DiscoveryContent() {
  const params = useSearchParams();
  const router = useRouter();
  const domain = params.get("domain");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!domain) return;

    async function load() {
      if (domain === "jobs") setData(await getJobs());
      if (domain === "schools") setData(await getSchools());
      if (domain === "colleges") setData(await getColleges());
      if (domain === "skills") setData(await getSkills());
    }

    load();
  }, [domain]);

  if (!domain || !data) {
    return (
      <div className="p-10 text-center text-[var(--muted)]">
        Loading options…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <header>
          <h1 className="text-2xl font-bold">Explore your options</h1>
          <p className="text-sm text-[var(--muted)]">
            Browse freely. We’ll help you decide when you’re ready.
          </p>
        </header>

        {domain === "schools" && (
          <SchoolsExplorer mode="guided" schools={data} />
        )}
        {domain === "colleges" && (
          <CollegesExplorer mode="guided" colleges={data} />
        )}
        {domain === "jobs" && (
          <JobsExplorer mode="guided" jobs={data} />
        )}
        {domain === "skills" && (
          <SkillsExplorer mode="guided" skills={data} />
        )}

        <div className="sticky bottom-4 text-center pt-6">
          <button
            onClick={() => router.push(`/guidance/intent?domain=${domain}`)}
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl"
          >
            Continue →
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= SUSPENSE WRAPPER ================= */
export default function GuidanceDiscoveryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[var(--muted)]">
          Loading guidance…
        </div>
      }
    >
      <DiscoveryContent />
    </Suspense>
  );
}
