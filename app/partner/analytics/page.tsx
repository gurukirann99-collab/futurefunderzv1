"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerAnalytics() {
  const [stats, setStats] = useState({
    courses: 0,
    enrollments: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      // ✅ AUTH GUARD
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.warn("User not logged in");
        setLoading(false);
        return;
      }

      // ✅ GET PARTNER
      const { data: partner, error: partnerError } = await supabase
        .from("partners")
        .select("id")
        .eq("user_id", data.user.id)
        .single();

      if (partnerError || !partner) {
        console.warn("Partner not found");
        setLoading(false);
        return;
      }

      // ✅ COURSE COUNT
      const { count: courses } = await supabase
        .from("partner_courses")
        .select("*", { count: "exact", head: true })
        .eq("partner_id", partner.id);

      // ✅ ENROLLMENTS COUNT (can be refined later per partner)
      const { count: enrollments } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      setStats({
        courses: courses || 0,
        enrollments: enrollments || 0,
        revenue: (enrollments || 0) * 999, // temporary revenue logic
      });

      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <StatCard label="Courses" value={stats.courses} />
        <StatCard label="Enrollments" value={stats.enrollments} />
        <StatCard label="Revenue (₹)" value={stats.revenue} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded p-4 text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
