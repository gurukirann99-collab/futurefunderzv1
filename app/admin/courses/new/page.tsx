"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    supabase.from("skills").select("id, name").then(({ data }) => {
      setSkills(data || []);
    });
  }, []);

  const save = async () => {
    const { data: course } = await supabase
      .from("courses")
      .insert({ title, level })
      .select()
      .single();

    if (course) {
      for (const skillId of selectedSkills) {
        await supabase.from("course_skills").insert({
          course_id: course.id,
          skill_id: skillId,
        });
      }
    }

    router.push("/admin/courses");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold">New Course</h1>

      <input
        placeholder="Course title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Level (Beginner / Intermediate)"
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
        Save Course
      </button>
    </div>
  );
}
