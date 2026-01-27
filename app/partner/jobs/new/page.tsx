"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    title: "",
    job_type: "job",
    description: "",
    location: "",
    salary_min: "",
    salary_max: "",
  });

  const save = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("jobs").insert({
      employer_id: session.user.id,
      title: form.title,
      job_type: form.job_type,
      description: form.description,
      location: form.location,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
    });

    router.push("/partner/jobs");
  };

  return (
    <div className="max-w-xl p-6 space-y-4">
      <h1 className="text-xl font-bold">Create Listing</h1>

      <input
        className="input"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, job_type: e.target.value })}
      >
        <option value="job">Job</option>
        <option value="internship">Internship</option>
        <option value="apprenticeship">Apprenticeship</option>
        <option value="project">Project</option>
      </select>

      <textarea
        className="input"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="input"
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />

      <input
        className="input"
        placeholder="Min Salary / Stipend"
        onChange={(e) => setForm({ ...form, salary_min: e.target.value })}
      />

      <input
        className="input"
        placeholder="Max Salary / Stipend"
        onChange={(e) => setForm({ ...form, salary_max: e.target.value })}
      />

      <button onClick={save} className="btn-primary w-full">
        Save Listing
      </button>
    </div>
  );
}
