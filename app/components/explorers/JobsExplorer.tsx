"use client";

import Link from "next/link";
import { Job } from "../types/jobs";
import GuidanceCTA from "@/app/components/explorers/GuidanceCTA";

type ExplorerMode = "explore" | "guided";

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export default function JobsExplorer({
  mode,
  jobs,
}: {
  mode: ExplorerMode;
  jobs: Job[];
}) {
  return (
    <div className="space-y-6">

      {mode === "guided" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Browse roles to understand requirements and growth.
          <br />
          <span className="font-medium">
            We’ll help you decide before you apply.
          </span>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border border-[var(--border)]
                       rounded-xl p-4 flex flex-col sm:flex-row
                       sm:items-center sm:justify-between gap-3"
          >
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-[var(--muted)]">
                {job.company}
              </p>
              {job.salary && (
                <p className="text-xs text-[var(--muted)] mt-1">
                  {job.salary}
                </p>
              )}
            </div>

            {mode === "explore" && (
              <Link
                href={`/explore/jobs/${slugify(job.title)}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View role →
              </Link>
            )}
          </div>
        ))}
      </div>
   
    </div>
  );
}
