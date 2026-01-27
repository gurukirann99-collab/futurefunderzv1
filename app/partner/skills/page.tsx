"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PartnerSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("skills")
        .select("*")
        .eq("partner_id", session.user.id)
        .order("created_at", { ascending: false });

      setSkills(data || []);
    };
    load();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Link href="/partner/skills/new" className="btn-primary">
          + New Skill
        </Link>
      </div>

      {skills.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No skills created yet.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((s) => (
          <Link
            key={s.id}
            href={`/partner/skills/${s.id}`}
            className="border rounded-xl p-4 hover:shadow"
          >
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-[var(--muted)]">
              {s.category} · {s.level}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
