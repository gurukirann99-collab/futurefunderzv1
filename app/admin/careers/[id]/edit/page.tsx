"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditCareerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [salaryBands, setSalaryBands] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: career } = await supabase
        .from("careers")
        .select("*")
        .eq("id", id)
        .single();

      const { data: cs } = await supabase
        .from("career_skills")
        .select("skill_id")
        .eq("career_id", id);

      const { data: salaries } = await supabase
        .from("career_salary_ladders")
        .select("*")
        .eq("career_id", id);

      const { data: allSkills } = await supabase
        .from("skills")
        .select("id, name");

      setTitle(career.title);
      setDomain(career.domain || "");
      setSelectedSkills(cs?.map((x) => x.skill_id) || []);
      setSalaryBands(salaries || []);
      setSkills(allSkills || []);
    };

    load();
  }, [id]);

  const save = async () => {
    await supabase.from("careers").update({ title, domain }).eq("id", id);

    await supabase.from("career_skills").delete().eq("career_id", id);
    await supabase.from("career_salary_ladders").delete().eq("career_id", id);

    for (const skillId of selectedSkills) {
      await supabase.from("career_skills").insert({
        career_id: id,
        skill_id: skillId,
      });
    }

    for (const band of salaryBands) {
      await supabase.from("career_salary_ladders").insert({
        career_id: id,
        experience_level: band.experience_level,
        min_salary: band.min_salary,
        max_salary: band.max_salary,
      });
    }

    router.push("/admin/careers");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Edit Career</h1>

      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />

      <div>
        <p className="font-medium mb-2">Skills</p>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((s) => (
            <label key={s.id} className="text-sm">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedSkills.includes(s.id)}
                onChange={() =>
                  setSelectedSkills((prev) =>
                    prev.includes(s.id)
                      ? prev.filter((x) => x !== s.id)
                      : [...prev, s.id]
                  )
                }
              />
              {s.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium mb-2">Salary Ladders</p>
        {salaryBands.map((b, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input
              className="border p-2 rounded"
              value={b.experience_level}
              onChange={(e) => {
                const x = [...salaryBands];
                x[i].experience_level = e.target.value;
                setSalaryBands(x);
              }}
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={b.min_salary}
              onChange={(e) => {
                const x = [...salaryBands];
                x[i].min_salary = Number(e.target.value);
                setSalaryBands(x);
              }}
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={b.max_salary}
              onChange={(e) => {
                const x = [...salaryBands];
                x[i].max_salary = Number(e.target.value);
                setSalaryBands(x);
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Update Career
      </button>
    </div>
  );
}
