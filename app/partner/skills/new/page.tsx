"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewSkillPage() {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    name: "",
    category: "IT",
    level: "beginner",
  });

  const save = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("skills").insert({
      partner_id: session.user.id,
      name: form.name,
      category: form.category,
      level: form.level,
    });

    router.push("/partner/skills");
  };

  return (
    <div className="max-w-xl p-6 space-y-4">
      <h1 className="text-xl font-bold">Create Skill</h1>

      <input
        className="input"
        placeholder="Skill name (e.g. Electrician, React, Welding)"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="IT">IT</option>
        <option value="Non-IT">Non-IT</option>
        <option value="Govt">Govt Skill</option>
        <option value="Trade">Trade</option>
      </select>

      <select
        className="input"
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <button onClick={save} className="btn-primary w-full">
        Save Skill
      </button>
    </div>
  );
}
