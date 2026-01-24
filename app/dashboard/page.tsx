"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [studentDone, setStudentDone] = useState(false);
  const [entrepreneurDone, setEntrepreneurDone] = useState(false);
  const [mentorProfileExists, setMentorProfileExists] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!profile?.role) {
        router.push("/role");
        return;
      }

      setRole(profile.role);

      // STUDENT
      if (profile.role === "student") {
        const { data } = await supabase
          .from("student_assessments")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);

        setStudentDone(!!data && data.length > 0);
      }

      // ENTREPRENEUR
      if (profile.role === "entrepreneur") {
        const { data } = await supabase
          .from("entrepreneur_stages")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);

        setEntrepreneurDone(!!data && data.length > 0);
      }

      // MENTOR
      if (profile.role === "mentor") {
        const { data } = await supabase
          .from("mentor_profiles")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);

        setMentorProfileExists(!!data && data.length > 0);
      }

      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  if (loading) return <p className="p-8">Loading dashboard...</p>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* ================= STUDENT ================= */}
      {role === "student" && (
        <div className="space-y-4">
          <Link
            href={studentDone ? "/student/result" : "/student/assessment"}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🎓 Career Assessment
            <p className="text-sm text-gray-600">
              {studentDone ? "Completed ✓" : "Understand your career clarity"}
            </p>
          </Link>

          <Link
            href="/mentor/request"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🧠 Request Mentor
            <p className="text-sm text-gray-600">
              Get guidance from a mentor
            </p>
          </Link>

          <Link
            href="/mentor/status"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            📌 Mentor Request Status
          </Link>
        </div>
      )}

      {/* ================= ENTREPRENEUR ================= */}
      {role === "entrepreneur" && (
        <div className="space-y-4">
          <Link
            href={entrepreneurDone ? "/entrepreneur/result" : "/entrepreneur/stage"}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🚀 Business Stage
            <p className="text-sm text-gray-600">
              {entrepreneurDone ? "Completed ✓" : "Tell us where your business stands"}
            </p>
          </Link>

          <Link
            href="/mentor/request"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🧠 Request Mentor
          </Link>

          <Link
            href="/mentor/status"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            📌 Mentor Request Status
          </Link>
        </div>
      )}

      {/* ================= MENTOR ================= */}
      {role === "mentor" && (
        <div className="space-y-4">
          <Link
            href={mentorProfileExists ? "/mentor/profile/view" : "/mentor/profile"}
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🧠 Mentor Profile
            <p className="text-sm text-gray-600">
              {mentorProfileExists
                ? "View or update your profile"
                : "Complete your mentor profile"}
            </p>
          </Link>

          <Link
            href="/mentor/requests"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            📨 Mentor Requests
            <p className="text-sm text-gray-600">
              View and respond to mentorship requests
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
