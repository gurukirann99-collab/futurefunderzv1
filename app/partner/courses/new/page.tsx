"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    title: "",
    category: "",
    mode: "online",
    duration: "",
    fee: "",
    level: "beginner",
  });

  const save = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    await supabase.from("courses").insert({
      partner_id: session.user.id,
      title: form.title,
      category: form.category,
      mode: form.mode,
      duration: form.duration,
      fee: form.fee ? Number(form.fee) : null,
      level: form.level,
    });

    router.push("/partner/courses");
  };

  return (
    <div className="max-w-xl p-6 space-y-4">
      <h1 className="text-xl font-bold">Create Course</h1>

      <input
        placeholder="Course title"
        className="input"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Category (IT, Govt Skill, Trade…)"
        className="input"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, mode: e.target.value })}
      >
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <input
        placeholder="Duration (e.g. 3 months)"
        className="input"
        onChange={(e) => setForm({ ...form, duration: e.target.value })}
      />

      <input
        placeholder="Fee (₹)"
        className="input"
        onChange={(e) => setForm({ ...form, fee: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, level: e.target.value })}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <button onClick={save} className="btn-primary w-full">
        Save Course
      </button>
    </div>
  );
}
