"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "../adminGuard";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const session = await requireAdmin(router);
      if (!session) return;

      const { data } = await supabase
        .from("profiles")
        .select("user_id, role, email_verified")
        .order("created_at", { ascending: false });

      setUsers(data || []);
    };

    load();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div
  key={u.user_id}
  className="border p-3 mb-2 rounded flex justify-between items-center"
>
  <div>
    <p className="text-sm text-gray-500">User ID</p>
    <p className="font-mono text-xs">{u.user_id}</p>
  </div>

  <div className="flex gap-2 items-center">
    <span className="px-2 py-1 text-xs rounded bg-gray-100">
      {u.role || "unassigned"}
    </span>

    {u.email_verified ? (
      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
        Email Verified
      </span>
    ) : (
      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
        Email Pending
      </span>
    )}
  </div>
</div>

      ))}
    </div>
  );
}
