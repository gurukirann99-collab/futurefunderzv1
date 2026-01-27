"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewSkillPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [skillType, setSkillType] = useState("IT");
  const [description, setDescription] = useState("");

  const save = async () => {
    await supabase.from("skills").insert({
      name,
      slug,
      skill_type: skillType,
      description,
    });
    router.push("/admin/skills");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">New Skill</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Skill name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
        }}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={skillType}
        onChange={(e) => setSkillType(e.target.value)}
      >
        <option value="IT">IT</option>
        <option value="NON_IT">NON IT</option>
        <option value="VOCATIONAL">VOCATIONAL</option>
        <option value="GOVT">GOVT</option>
        <option value="SOFT">SOFT</option>
      </select>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
