"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function AdminAdmissionDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("admission_applications")
      .select(`
        *,
        colleges ( name ),
        student:profiles!admission_applications_student_id_fkey ( full_name ),
        parent:profiles!admission_applications_parent_id_fkey ( full_name )
      `)
      .eq("id", id)
      .single()
      .then(({ data }) => setApp(data));
  }, [id]);

  const updateStatus = async (status: string) => {
    await supabase
      .from("admission_applications")
      .update({ status })
      .eq("id", id);

    router.push("/admin/admissions");
  };

  if (!app) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">
        {app.colleges?.name}
      </h1>

      <div className="text-sm space-y-1">
        <p><b>Student:</b> {app.student?.full_name}</p>
        <p><b>Parent:</b> {app.parent?.full_name || "—"}</p>
        <p><b>Applied By:</b> {app.applied_by}</p>
        <p><b>Status:</b> {app.status}</p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => updateStatus("shortlisted")}
          className="btn-secondary w-full"
        >
          Shortlist
        </button>
        <button
          onClick={() => updateStatus("accepted")}
          className="btn-primary w-full"
        >
          Accept
        </button>
        <button
          onClick={() => updateStatus("rejected")}
          className="w-full border border-red-500 text-red-600 py-2 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
