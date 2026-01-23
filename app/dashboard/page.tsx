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

  
  useEffect(() => {
    const loadDashboard = async () => {
      // 1️⃣ Get active session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // 2️⃣ Get THIS user's role only
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (error || !data?.role) {
        router.push("/role");
        return;
      }

      setRole(data.role);
      // Check if student assessment is completed
        const { data: studentData } = await supabase
        .from("student_assessments")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

        setStudentDone(!!studentData && studentData.length > 0);

        // Check if entrepreneur stage is completed
        const { data: entrepreneurData } = await supabase
        .from("entrepreneur_stages")
        .select("id")
        .eq("user_id", session.user.id)
        .limit(1);

        setEntrepreneurDone(!!entrepreneurData && entrepreneurData.length > 0);

      setLoading(false);
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* STUDENT */}
      {role === "student" && (
        <div className="space-y-4">
          <Link
            href={studentDone ? "/student/result" : "/student/assessment"}
            className="block border p-4 rounded hover:bg-gray-100"
>
            🎓 Career Assessment
            <p className="text-sm text-gray-600">
            {studentDone ? "Completed ✓" : "Understand your career clarity and skills"}
            </p>
         </Link>

          <Link
            href="/student/result"
            className="block border p-4 rounded hover:bg-gray-100"
          >
            📊 View Last Result
            <p className="text-sm text-gray-600">
              See your latest career snapshot
            </p>
          </Link>

          <div className="border p-4 rounded bg-gray-50">
            🧠 Mentor Guidance
            <p className="text-sm text-gray-600">
              Coming soon
            </p>
          </div>
        </div>
      )}

      {/* ENTREPRENEUR */}
      {role === "entrepreneur" && (
        <div className="space-y-4">
          <Link
          href={entrepreneurDone ? "/entrepreneur/result" : "/entrepreneur/stage"}
          className="block border p-4 rounded hover:bg-gray-100">
          🚀 Business Stage
          <p className="text-sm text-gray-600">
          {entrepreneurDone ? "Completed ✓" : "Tell us where your business stands"}
          </p>
        </Link>


          <div className="border p-4 rounded bg-gray-50">
            📑 Compliance & Funding
            <p className="text-sm text-gray-600">
              Guidance coming soon
            </p>
          </div>

          <div className="border p-4 rounded bg-gray-50">
            🤝 Investor & Mentor Connect
            <p className="text-sm text-gray-600">
              Coming soon
            </p>
          </div>
        </div>
      )}

      {/* MENTOR */}
      {role === "mentor" && (
  <div className="space-y-4">
    <Link
      href="/mentor/profile"
      className="block border p-4 rounded hover:bg-gray-100"
    >
      🧠 Mentor Profile
      <p className="text-sm text-gray-600">
        Complete your mentor profile
      </p>
    </Link>

    <div className="border p-4 rounded bg-gray-50">
      📥 Mentorship Requests
      <p className="text-sm text-gray-600">
        Coming soon
      </p>
    </div>
  </div>
)}
    </div>
  );
}
