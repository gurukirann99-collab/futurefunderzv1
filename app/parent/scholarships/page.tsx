"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ParentScholarships() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [applied, setApplied] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScholarships();
    loadApplied();
  }, []);

  const loadScholarships = async () => {
    const { data, error } = await supabase
      .from("scholarships")
      .select("*")
      .order("amount", { ascending: false });

    if (!error) {
      setScholarships(data || []);
    }
  };

  const loadApplied = async () => {
    const { data, error } = await supabase.auth.getUser();

    // ✅ AUTH GUARD (FIXES TS ERROR)
    if (error || !data?.user) {
      console.warn("User not logged in");
      setApplied([]);
      setLoading(false);
      return;
    }

    const { data: apps } = await supabase
      .from("scholarship_applications")
      .select("scholarship_id")
      .eq("user_id", data.user.id);

    setApplied((apps || []).map(a => a.scholarship_id));
    setLoading(false);
  };

  const apply = async (scholarshipId: string) => {
    const { data, error } = await supabase.auth.getUser();

    // ✅ AUTH GUARD (FIXES TS ERROR)
    if (error || !data?.user) {
      alert("Please login first");
      return;
    }

    await supabase.from("scholarship_applications").insert({
      user_id: data.user.id,
      scholarship_id: scholarshipId,
      status: "applied",
    });

    alert("Scholarship application submitted");
    loadApplied();
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading scholarships...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Scholarships</h1>
      <p className="text-gray-600 mt-1">
        Scholarships available for your child based on profile
      </p>

      <div className="mt-6 space-y-4">
        {scholarships.map(s => (
          <div key={s.id} className="border rounded p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{s.provider}</p>
                <p className="text-sm text-gray-600">
                  Amount: ₹{s.amount}
                </p>
                {s.deadline && (
                  <p className="text-xs text-gray-500">
                    Deadline: {new Date(s.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div>
                {applied.includes(s.id) ? (
                  <span className="text-green-600 font-medium">
                    Applied ✔
                  </span>
                ) : (
                  <button
                    onClick={() => apply(s.id)}
                    className="bg-black text-white px-4 py-1 rounded"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              Eligibility: {JSON.stringify(s.eligibility)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
