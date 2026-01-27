"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import OpportunityBadge from "@/app/components/OpportunityBadge";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const [opp, setOpp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .single();

      setOpp(data);
      setLoading(false);
    };

    load();
  }, [id]);

  const apply = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("applications").insert({
      user_id: session.user.id,
      opportunity_id: opp.id,
    });

    setApplied(true);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{opp.title}</h1>
        <OpportunityBadge type={opp.type} />
      </div>

      <p className="text-[var(--muted)]">
        {opp.description}
      </p>

      <div className="text-sm">
        <p>Duration: {opp.duration || "Flexible"}</p>
        {opp.stipend && <p>Stipend: ₹{opp.stipend}</p>}
        {opp.salary_min && (
          <p>
            Salary: ₹{opp.salary_min} – ₹{opp.salary_max}
          </p>
        )}
      </div>

      <button
        onClick={apply}
        disabled={applied}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}
