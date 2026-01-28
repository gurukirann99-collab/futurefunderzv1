"use client";

import Link from "next/link";
import GuidanceCTA from "@/app/components/explorers/GuidanceCTA";
import { College } from "../types/colleges";
type ExplorerMode = "explore" | "guided";

export default function CollegesExplorer({
  mode,
  colleges,
}: {
  mode: ExplorerMode;
  colleges: College[];
}) {
  return (
    <div className="space-y-6">

      {/* GUIDED CONTEXT */}
      {mode === "guided" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Colleges differ greatly in outcomes, not just fees.
          <br />
          We’ll help you compare ROI, careers, and long-term value.
        </div>
      )}

      {/* COLLEGE LIST */}
      <div className="space-y-4">
        {colleges.map((college) => (
          <div
            key={college.id}
            className="border border-[var(--border)]
                       rounded-xl p-4 space-y-1"
          >
            <p className="font-medium">{college.name}</p>
            <p className="text-sm text-[var(--muted)]">
              {college.course}
            </p>

            {college.avgPlacement && (
              <p className="text-xs text-[var(--muted)] mt-1">
                Avg placement: {college.avgPlacement}
              </p>
            )}

            {mode === "explore" && (
              <Link
                href={`/explore/colleges/${college.id}`}
                className="text-sm text-blue-600 hover:underline inline-block mt-2"
              >
                View college →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
