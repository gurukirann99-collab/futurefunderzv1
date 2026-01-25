"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      setApps(data || []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p className="p-8">Loading applications...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Your Applications</h1>

      {apps.length === 0 && (
        <p className="text-gray-600 text-sm">
          You haven’t applied to any opportunities yet.
        </p>
      )}

      {apps.map((app) => (
        <div
          key={app.id}
          className="border rounded p-3 text-sm"
        >
          <p>
            {app.opportunity_type.toUpperCase()} —{" "}
            {app.opportunity_id}
          </p>
          <p className="text-gray-500">
            Applied on{" "}
            {new Date(app.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
