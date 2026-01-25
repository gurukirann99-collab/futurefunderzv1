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
        className="text-sm bg-green-100 text-green-700 px-3 py-2 rounded"
      >
        ✓ Applied
      </button>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={loading}
      className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Applying..." : "Apply"}
    </button>
  );
}
