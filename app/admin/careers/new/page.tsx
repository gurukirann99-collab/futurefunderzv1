"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewCareerPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const [salaryBands, setSalaryBands] = useState([
    { experience_level: "Fresher", min_salary: 0, max_salary: 0 },
  ]);

  useEffect(() => {
    supabase.from("skills").select("id, name").then(({ data }) => {
      setSkills(data || []);
    });
  }, []);

  const save = async () => {
    const { data: career } = await supabase
      .from("careers")
      .insert({ title, domain })
      .select()
      .single();

    if (!career) return;

    for (const skillId of selectedSkills) {
      await supabase.from("career_skills").insert({
        career_id: career.id,
        skill_id: skillId,
      });
    }

    for (const band of salaryBands) {
      await supabase.from("career_salary_ladders").insert({
        career_id: career.id,
        experience_level: band.experience_level,
        min_salary: band.min_salary,
        max_salary: band.max_salary,
      });
    }

    router.push("/admin/careers");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">New Career</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Career title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Domain (IT / Healthcare / Business)"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />

      {/* Skills */}
      <div>
        <p className="font-medium mb-2">Required Skills</p>
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

      {/* Salary */}
      <div>
        <p className="font-medium mb-2">Salary Ladders</p>

        {salaryBands.map((b, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <input
              className="border p-2 rounded"
              placeholder="Experience"
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
              placeholder="Min"
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
              placeholder="Max"
              value={b.max_salary}
              onChange={(e) => {
                const x = [...salaryBands];
                x[i].max_salary = Number(e.target.value);
                setSalaryBands(x);
              }}
            />
          </div>
        ))}

        <button
          type="button"
          className="text-sm text-[var(--primary)]"
          onClick={() =>
            setSalaryBands((p) => [
              ...p,
              { experience_level: "", min_salary: 0, max_salary: 0 },
            ])
          }
        >
          + Add Band
        </button>
      </div>

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Save Career
      </button>
    </div>
  );
}
