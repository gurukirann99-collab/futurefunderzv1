"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditCoursePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

      const { data: skillLinks } = await supabase
        .from("course_skills")
        .select("skill_id")
        .eq("course_id", id);

      const { data: allSkills } = await supabase
        .from("skills")
        .select("id, name");

      setTitle(course.title);
      setLevel(course.level);
      setSkills(allSkills || []);
      setSelectedSkills(skillLinks?.map((s) => s.skill_id) || []);
    };

    load();
  }, [id]);

  const save = async () => {
    await supabase
      .from("courses")
      .update({ title, level })
      .eq("id", id);

    await supabase.from("course_skills").delete().eq("course_id", id);

    for (const skillId of selectedSkills) {
      await supabase.from("course_skills").insert({
        course_id: id,
        skill_id: skillId,
      });
    }

    router.push("/admin/courses");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">Edit Course</h1>

      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />

      <div>
        <p className="font-medium mb-2">Skills taught</p>
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

      <button
        onClick={save}
        className="bg-[var(--primary)] text-white px-5 py-2 rounded"
      >
        Update Course
      </button>
    </div>
  );
}
