"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerLoans() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("loan_applications")
        .select(`
          id,
          status,
          created_at,
          users_profile:user_id ( city ),
          loan_products:loan_id ( bank, interest_rate )
        `);

      setApplications(data || []);
    };

    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Student Loan Requests</h1>

      <p className="text-sm text-gray-500 mt-1">
        Students applying for education loans linked to your courses
      </p>

      <div className="mt-6 space-y-4">
        {applications.map(app => (
          <div key={app.id} className="border rounded p-4">
            <p><b>Bank:</b> {app.loan_products?.bank}</p>
            <p><b>Interest:</b> {app.loan_products?.interest_rate}%</p>
            <p><b>Student City:</b> {app.users_profile?.city}</p>
            <p className="text-sm text-gray-600">
              Status: {app.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
