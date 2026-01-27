"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("careers")
      .select("id, title, domain")
      .order("title")
      .then(({ data }) => setCareers(data || []));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Careers</h1>
        <Link
          href="/admin/careers/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          + New Career
        </Link>
      </div>

      <div className="space-y-3">
        {careers.map((c) => (
          <div
            key={c.id}
            className="border border-[var(--border)] rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-xs text-[var(--muted)]">
                Domain: {c.domain || "—"}
              </p>
            </div>

            <Link
              href={`/admin/careers/${c.id}/edit`}
              className="text-sm text-[var(--primary)]"
            >
              Edit →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
