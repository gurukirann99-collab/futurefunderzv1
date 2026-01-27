"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ParentAdmissionProfile() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    student_name: "",
    current_education: "",
    stream: "",
    marks: "",
    target_degree: "",
    target_field: "",
    budget_min: "",
    budget_max: "",
    location_preference: "",
    distance_km: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("admission_profiles")
        .select("*")
        .eq("user_id", data.session.user.id)
        .single();

      if (profile) setForm(profile);
    });
  }, [router]);

  const save = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("admission_profiles").upsert({
      user_id: session.user.id,
      user_role: "parent",
      ...form,
    });

    router.push("/parent/admissions/colleges");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Child Admission Profile</h1>

      <input className="input" placeholder="Student Name"
        value={form.student_name}
        onChange={(e)=>setForm({...form,student_name:e.target.value})}
      />

      {/* remaining fields same as student */}

      <button onClick={save} className="btn-primary w-full">
        Save & Explore Colleges →
      </button>
    </div>
  );
}
