"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function StudentAdmissionProfile() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
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
      user_role: "student",
      ...form,
    });

    router.push("/student/admissions/colleges");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admission Profile</h1>

      <input className="input" placeholder="Current Education"
        value={form.current_education}
        onChange={(e)=>setForm({...form,current_education:e.target.value})}
      />

      <select className="input"
        value={form.stream}
        onChange={(e)=>setForm({...form,stream:e.target.value})}
      >
        <option value="">Select Stream</option>
        <option>Science</option>
        <option>Commerce</option>
        <option>Arts</option>
      </select>

      <input className="input" placeholder="Marks / Percentage"
        value={form.marks}
        onChange={(e)=>setForm({...form,marks:e.target.value})}
      />

      <select className="input"
        value={form.target_degree}
        onChange={(e)=>setForm({...form,target_degree:e.target.value})}
      >
        <option value="">Target Degree</option>
        <option>UG</option>
        <option>PG</option>
        <option>Diploma</option>
      </select>

      <input className="input" placeholder="Target Field (Engineering, etc)"
        value={form.target_field}
        onChange={(e)=>setForm({...form,target_field:e.target.value})}
      />

      <div className="grid grid-cols-2 gap-2">
        <input className="input" placeholder="Min Budget"
          value={form.budget_min}
          onChange={(e)=>setForm({...form,budget_min:e.target.value})}
        />
        <input className="input" placeholder="Max Budget"
          value={form.budget_max}
          onChange={(e)=>setForm({...form,budget_max:e.target.value})}
        />
      </div>

      <input className="input" placeholder="Preferred City / State"
        value={form.location_preference}
        onChange={(e)=>setForm({...form,location_preference:e.target.value})}
      />

      <input className="input" placeholder="Distance (km)"
        value={form.distance_km}
        onChange={(e)=>setForm({...form,distance_km:e.target.value})}
      />

      <button onClick={save} className="btn-primary w-full">
        Save & Explore Colleges →
      </button>
    </div>
  );
}
