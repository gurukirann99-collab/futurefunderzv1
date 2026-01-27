"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CollegeCompareTable from "@/app/components/CollegeCompareTable";

export default function StudentComparePage() {
  const params = useSearchParams();
  const ids = params.get("ids")?.split(",") || [];
  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    if (!ids.length) return;

    supabase
      .from("colleges")
      .select("*")
      .in("id", ids)
      .then(({ data }) => setColleges(data || []));
  }, [ids]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Compare Colleges</h1>

      <CollegeCompareTable colleges={colleges} />
    </div>
  );
}
