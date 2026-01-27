"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("skills")
      .select("id, name, skill_type")
      .order("name")
      .then(({ data }) => setSkills(data || []));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded"
        >
          + New Skill
        </Link>
      </div>

      <div className="space-y-3">
        {skills.map((s) => (
          <div
            key={s.id}
            className="border border-[var(--border)] rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-[var(--muted)]">
                {s.skill_type}
              </p>
            </div>

            <Link
              href={`/admin/skills/${s.id}/edit`}
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
