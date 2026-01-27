"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function PartnerSkillDetail() {
  const { id } = useParams();
  const [skill, setSkill] = useState<any>(null);
  const [careers, setCareers] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    supabase.from("skills").select("*").eq("id", id).single()
      .then(({ data }) => setSkill(data));

    supabase.from("careers").select("id,title")
      .then(({ data }) => setCareers(data || []));
  }, [id]);

  const mapCareer = async () => {
    if (!selected) return;

    await supabase.from("skill_career_map").insert({
      skill_id: id,
      career_id: selected,
    });

    alert("Mapped to career");
  };

  if (!skill) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">{skill.name}</h1>
      <p className="text-sm">
        {skill.category} · {skill.level}
      </p>

      <div className="pt-4 space-y-2">
        <select
          className="input"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Map to career</option>
          {careers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <button onClick={mapCareer} className="btn-secondary">
          Link Career
        </button>
      </div>
    </div>
  );
}
