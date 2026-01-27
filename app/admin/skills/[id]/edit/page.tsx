"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditSkillPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [skillType, setSkillType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setName(data.name);
        setSlug(data.slug);
        setSkillType(data.skill_type);
        setDescription(data.description || "");
      });
  }, [id]);

  const save = async () => {
    await supabase
      .from("skills")
      .update({
        name,
        slug,
        skill_type: skillType,
        description,
      })
      .eq("id", id);

    router.push("/admin/skills");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Skill</h1>

      <input
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
