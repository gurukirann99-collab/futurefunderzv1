"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function StudentApplications() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("admission_applications")
        .select("id, status, created_at, colleges(name)")
        .eq("student_id", session.user.id)
        .order("created_at", { ascending: false });

      setApps(data || []);
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Applications</h1>

      {apps.map((a) => (
        <div key={a.id} className="border rounded-xl p-4">
          <p className="font-medium">{a.colleges.name}</p>
          <p className="text-sm text-[var(--muted)]">
            Status: {a.status}
          </p>
        </div>
      ))}
    </div>
  );
}
