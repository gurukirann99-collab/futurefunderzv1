"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminAdmissionsPage() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("admission_applications")
      .select(`
        id,
        status,
        applied_by,
        created_at,
        colleges ( name ),
        student:profiles!admission_applications_student_id_fkey ( full_name ),
        parent:profiles!admission_applications_parent_id_fkey ( full_name )
      `)
      .order("created_at", { ascending: false })
      .then(({ data }) => setApps(data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admissions</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-[var(--card)]">
            <tr>
              <th className="p-2 text-left">College</th>
              <th className="p-2">Student</th>
              <th className="p-2">Applied By</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.colleges?.name}</td>
                <td className="p-2 text-center">
                  {a.student?.full_name || "—"}
                </td>
                <td className="p-2 text-center">
                  {a.applied_by}
                </td>
                <td className="p-2 text-center">
                  {a.status}
                </td>
                <td className="p-2 text-center">
                  {new Date(a.created_at).toDateString()}
                </td>
                <td className="p-2 text-right">
                  <Link
                    href={`/admin/admissions/${a.id}`}
                    className="text-[var(--primary)]"
                  >
                    Review →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
