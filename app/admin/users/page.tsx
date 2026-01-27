"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("user_id, full_name, role, email_verified, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setUsers(data || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-[var(--border)] text-sm">
          <thead className="bg-[var(--card)]">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Verified</th>
              <th className="p-2">Joined</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t">
                <td className="p-2">
                  {u.full_name || "—"}
                </td>
                <td className="p-2 text-center">
                  {u.role}
                </td>
                <td className="p-2 text-center">
                  {u.email_verified ? "✔" : "—"}
                </td>
                <td className="p-2 text-center">
                  {new Date(u.created_at).toDateString()}
                </td>
                <td className="p-2 text-right">
                  <Link
                    href={`/admin/users/${u.user_id}/edit`}
                    className="text-[var(--primary)]"
                  >
                    Manage →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
