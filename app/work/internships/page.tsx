"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import BackButton from "@/app/components/BackButton";
import ApplyButton from "@/app/components/ApplyButton";

const INTERNSHIPS = [
  {
    id: "web-intern",
    title: "Web Development Intern",
    company: "Startup Team",
    duration: "3 months",
    type: "Remote",
    description:
      "Work on basic website features and learn real-world web development.",
  },
  {
    id: "marketing-intern",
    title: "Digital Marketing Intern",
    company: "Growth Agency",
    duration: "2 months",
    type: "Remote",
    description:
      "Assist in content creation, social media, and campaign tracking.",
  },
  {
    id: "design-intern",
    title: "UI / UX Design Intern",
    company: "Design Studio",
    duration: "3 months",
    type: "Hybrid",
    description:
      "Support design tasks, wireframes, and visual assets.",
  },
];

export default function InternshipsPage() {
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
        .eq("opportunity_type", "internship");

      setAppliedIds(data?.map((a) => a.opportunity_id) || []);
      setPageLoading(false);
    };

    load();
  }, []);

  if (loading || pageLoading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading internships...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-4xl mx-auto space-y-6 text-[var(--text)]">
        <BackButton />

        <div>
          <h1 className="text-2xl font-bold">
            Internships
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Internships help you gain hands-on experience by working with real teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {INTERNSHIPS.map((internship) => (
            <div
              key={internship.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-3 hover:shadow"
            >
              <div>
                <h2 className="font-semibold">
                  {internship.title}
                </h2>
                <p className="text-xs text-[var(--muted)]">
                  {internship.company} • {internship.duration} • {internship.type}
                </p>
              </div>

              <p className="text-sm text-[var(--muted)]">
                {internship.description}
              </p>

              <ApplyButton
                userId={userId}
                opportunityId={internship.id}
                opportunityType="internship"
                alreadyApplied={appliedIds.includes(internship.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
