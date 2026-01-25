"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "../adminGuard";

export default function AdminMentorRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const session = await requireAdmin(router);
      if (!session) return;

      const { data } = await supabase
        .from("mentor_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setRequests(data || []);
    };

    load();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mentor Requests</h1>

      {requests.map((r) => (
        <div
  key={r.id}
  className="border p-3 mb-2 rounded flex justify-between items-center"
>
  <div>
    <p className="text-sm">
      Requester: <span className="font-mono">{r.requester_id}</span>
    </p>
    <p className="text-sm">
      Mentor: <span className="font-mono">{r.mentor_id}</span>
    </p>
  </div>

  <span
    className={`px-2 py-1 text-xs rounded ${
      r.status === "accepted"
        ? "bg-green-100 text-green-700"
        : r.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {r.status}
  </span>
</div>

      ))}
    </div>
  );
}
