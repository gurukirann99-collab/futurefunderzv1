"use client";

import Link from "next/link";
import GuidanceCTA from "@/app/components/explorers/GuidanceCTA";
import { Skill } from "../types/skills";
type ExplorerMode = "explore" | "guided";

export default function SkillsExplorer({
  mode,
  skills,
}: {
  mode: ExplorerMode;
  skills: Skill[];
}) {
  return (
    <div className="space-y-6">

      {/* GUIDED CONTEXT */}
      {mode === "guided" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Skills matter only when they lead somewhere.
          <br />
          We’ll help you choose skills aligned to real roles.
        </div>
      )}

      {/* SKILL LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="border border-[var(--border)]
                       rounded-xl p-4 space-y-1"
          >
            <p className="font-medium">{skill.name}</p>
            <p className="text-sm text-[var(--muted)]">
              Leads to: {skill.outcome}
            </p>

            {mode === "explore" && (
              <Link
                href={`/explore/skills/${skill.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View skill →
              </Link>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
