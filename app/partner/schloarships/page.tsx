"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerScholarships() {
  const [scholarships, setScholarships] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("scholarships")
      .select("*")
      .then(({ data }) => setScholarships(data || []));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Scholarship Programs</h1>

      <div className="mt-6 space-y-4">
        {scholarships.map(s => (
          <div key={s.id} className="border p-4 rounded">
            <p className="font-semibold">{s.provider}</p>
            <p>Amount: ₹{s.amount}</p>
            <p className="text-sm text-gray-500">
              Eligibility: {JSON.stringify(s.eligibility)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
