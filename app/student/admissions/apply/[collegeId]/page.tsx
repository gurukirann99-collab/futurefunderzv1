"use client";

import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentApplyPage() {
  const { collegeId } = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("colleges")
      .select("*")
      .eq("id", collegeId)
      .single()
      .then(({ data }) => setCollege(data));
  }, [collegeId]);

  const apply = async () => {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("admission_applications").insert({
      student_id: session.user.id,
      parent_id: null,
      college_id: collegeId,
      applied_by: "student",
    });

    router.push("/student/admissions/applications");
  };

  if (!college) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Apply to {college.name}</h1>

      <p className="text-sm text-[var(--muted)]">
        Fees: ₹{college.fees} · Avg Package: ₹{college.avg_package}
      </p>

      <button
        onClick={apply}
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? "Submitting…" : "Confirm Application"}
      </button>
    </div>
  );
}
