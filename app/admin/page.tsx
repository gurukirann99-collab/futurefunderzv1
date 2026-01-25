"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "./adminGuard";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<{
    users: number | null;
    mentorRequests: number | null;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const session = await requireAdmin(router);
      if (!session) return;

      const { count: users } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: mentorRequests } = await supabase
        .from("mentor_requests")
        .select("*", { count: "exact", head: true });

      setStats({
        users: users ?? 0,
        mentorRequests: mentorRequests ?? 0,
      });
    };

    load();
  }, [router]);

  if (!stats) return <p className="p-6">Loading admin overview…</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>

      {/* === STATS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Mentor Requests</p>
          <p className="text-2xl font-bold">{stats.mentorRequests}</p>
        </div>
      </div>

      {/* === NAVIGATION === */}
      <div className="flex gap-6 text-sm">
        <Link href="/admin/users" className="underline">
          View Users
        </Link>

        <Link href="/admin/mentor-requests" className="underline">
          View Mentor Requests
        </Link>
      </div>
    </div>
  );
}
