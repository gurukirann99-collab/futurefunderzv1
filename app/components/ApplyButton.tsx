"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  userId: string | null;
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(alreadyApplied);

  const apply = async () => {
    if (!userId) {
      router.push(
        `/login?redirect=/work/${opportunityType}s`
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("applications").insert({
      user_id: userId,
      opportunity_id: opportunityId,
      opportunity_type: opportunityType,
    });

    if (!error) {
      setApplied(true);
    }

    setLoading(false);
  };

  if (applied) {
    return (
      <button
        disabled
        className="text-sm px-4 py-2 rounded bg-gray-200 text-gray-600"
      >
        Applied ✓
      </button>
    );
  }

  return (
    <button
      onClick={apply}
      disabled={loading}
      className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Applying..." : "Apply"}
    </button>
  );
}
