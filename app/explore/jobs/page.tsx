import JobsExplorer from "@/app/components/explorers/JobsExplorer";
import { getJobs } from "@/app/components/hooks/useJobs";
import Link from "next/link";

export default async function ExploreJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Explore jobs & income paths
        </h1>
        <p className="text-[var(--muted)]">
          Understand roles, required skills, and growth — no pressure to apply.
        </p>
      </header>

      {/* JOBS EXPLORER */}
      <JobsExplorer mode="explore" jobs={jobs} />

      {/* SOFT EXIT TO GUIDANCE (OPTIONAL) */}
      <div className="border-t pt-6 text-center">
        <p className="text-sm text-[var(--muted)]">
          Feeling unsure?
          <Link
            href="/guidance/explore?domain=jobs"
            className="underline ml-1"
          >
            Get guided help
          </Link>
        </p>
      </div>

    </div>
  );
}
