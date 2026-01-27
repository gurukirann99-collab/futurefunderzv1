"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { scoreCollege } from "@/lib/admissions/matchColleges";

export default function StudentCollegeMatching() {
  const [matches, setMatches] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profile } = await supabase
        .from("admission_profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      const { data: colleges } = await supabase
        .from("colleges")
        .select("*");

      if (!profile || !colleges) return;

      const scored = colleges.map((c) => ({
        ...c,
        score: scoreCollege(profile, c),
      }));

      scored.sort((a, b) => b.score - a.score);
      setMatches(scored);
      setLoading(false);
    };

    load();
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return <p className="p-6">Finding best colleges…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Best Colleges For You
      </h1>

      {/* Compare Button */}
      {selected.length >= 2 && (
        <Link
          href={`/student/admissions/compare?ids=${selected.join(",")}`}
          className="inline-block btn-secondary"
        >
          Compare Selected ({selected.length})
        </Link>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {matches.map((c) => {
          const isSelected = selected.includes(c.id);

          return (
            <div
              key={c.id}
              className="border rounded-xl p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{c.name}</h3>
                <span className="text-sm font-bold text-green-600">
                  {c.score}/100
                </span>
              </div>

              <p className="text-sm text-[var(--muted)]">
                City: {c.city}
              </p>

              <p className="text-sm">
                Fees: ₹{c.fees} · Avg Package: ₹{c.avg_package}
              </p>

              <div className="flex gap-3 pt-2">
                {/* Select for Compare */}
                <button
                  onClick={() => toggleSelect(c.id)}
                  className="btn-secondary"
                >
                  {isSelected ? "Selected ✓" : "Select"}
                </button>

                {/* Apply */}
                <Link
                  href={`/student/admissions/apply/${c.id}`}
                  className="btn-primary"
                >
                  Apply
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
