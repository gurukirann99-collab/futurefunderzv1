"use client";

import Link from "next/link";
import GuidanceCTA from "@/app/components/explorers/GuidanceCTA";
import { School } from "../types/schools";
type ExplorerMode = "explore" | "guided";

export default function SchoolsExplorer({
  mode,
  schools,
}: {
  mode: ExplorerMode;
  schools: School[];
}) {
  return (
    <div className="space-y-6">

      {/* GUIDED CONTEXT */}
      {mode === "guided" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Choosing a school is a long-term decision.
          <br />
          We’ll help you compare safety, academics, and outcomes before applying.
        </div>
      )}

      {/* SCHOOL LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="border border-[var(--border)]
                       rounded-xl p-4 space-y-1"
          >
            <p className="font-medium">{school.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {school.area} • {school.board}
            </p>

            {mode === "explore" && (
              <Link
                href={`/explore/schools/${school.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View school →
              </Link>
            )}
          </div>
        ))}
      </div>
     </div>
  );
}
