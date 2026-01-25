"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

type Props = {
  userId: string;
  opportunityId: string;
  opportunityType: "job" | "internship";
  alreadyApplied: boolean;
};

export default function ApplyButton({
  userId,
  opportunityId,
  opportunityType,
  alreadyApplied,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  const handleApply = async () => {
    if (applied) return;

    setLoading(true);

    const { error } = await supabase.from("applications").insert({
      user_id: userId,
      opportunity_id: opportunityId,
      opportunity_type: opportunityType,
    });

    if (error) {
      console.error(error);
      alert("Failed to apply. Please try again.");
    } else {
      setApplied(true);
    }

    setLoading(false);
  };

  if (applied) {
    return (
      <button
        disabled
        className="text-sm px-3 py-2 rounded bg-[rgba(34,197,94,0.15)] text-[rgb(34,197,94)]"
      >
        ✓ Applied
      </button>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="text-sm bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50"
    >
      {loading ? "Applying..." : "Apply"}
    </button>
  );
}
