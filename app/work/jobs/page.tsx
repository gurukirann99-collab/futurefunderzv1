"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import BackButton from "@/app/components/BackButton";
import ApplyButton from "@/app/components/ApplyButton";

const JOBS = [
  {
    id: "junior-web-dev",
    title: "Junior Web Developer",
    company: "Tech Startup",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: "marketing-exec",
    title: "Marketing Executive",
    company: "Growth Company",
    location: "Bangalore",
    type: "Full-time",
  },
  {
    id: "content-writer",
    title: "Content Writer",
    company: "Media Firm",
    location: "Remote",
    type: "Contract",
  },
];

export default function JobsPage() {
  const { loading } = useRequireAuth();

  const [userId, setUserId] = useState<string>("");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setPageLoading(false);
        return;
      }

      setUserId(session.user.id);

      const { data } = await supabase
        .from("applications")
        .select("opportunity_id")
        .eq("user_id", session.user.id)
        .eq("opportunity_type", "job");

      setAppliedIds(data?.map((a) => a.opportunity_id) || []);
      setPageLoading(false);
    };

    load();
  }, []);

  if (loading || pageLoading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading jobs...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-4xl mx-auto space-y-6 text-[var(--text)]">
        <BackButton />

        <div>
          <h1 className="text-2xl font-bold">
            Jobs
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Apply to entry-level roles based on your current skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {JOBS.map((job) => (
            <div
              key={job.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3 hover:shadow"
            >
              <div>
                <h2 className="font-semibold">
                  {job.title}
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {job.company} • {job.location} • {job.type}
                </p>
              </div>

              <ApplyButton
                userId={userId}
                opportunityId={job.id}
                opportunityType="job"
                alreadyApplied={appliedIds.includes(job.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
