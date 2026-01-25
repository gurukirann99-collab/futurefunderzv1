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
    <div className="min-h-screen bg-[var(--bg)] p-6 text-[var(--text)]">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div
          key={u.user_id}
          className="bg-[var(--card)] border border-[var(--border)] p-3 mb-2 rounded-xl flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-[var(--muted)]">User ID</p>
            <p className="font-mono text-xs">{u.user_id}</p>
          </div>

          <div className="flex gap-2 items-center">
            <span className="px-2 py-1 text-xs rounded bg-[var(--border)] text-[var(--text)]">
              {u.role || "unassigned"}
            </span>

            {u.email_verified ? (
              <span className="px-2 py-1 text-xs rounded bg-[rgba(34,197,94,0.15)] text-[rgb(34,197,94)]">
                Email Verified
              </span>
            ) : (
              <span className="px-2 py-1 text-xs rounded bg-[rgba(234,179,8,0.15)] text-[rgb(234,179,8)]">
                Email Pending
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
