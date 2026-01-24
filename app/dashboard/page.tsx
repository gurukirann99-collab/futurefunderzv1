"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [studentDone, setStudentDone] = useState(false);
  const [entrepreneurDone, setEntrepreneurDone] = useState(false);
  const [mentorProfileExists, setMentorProfileExists] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      // 1️⃣ Session check
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      // 2️⃣ Load profile FIRST
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role, email_verified")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!profileData) {
        setLoading(false);
        return;
      }

      // 3️⃣ Sync email verification SAFELY
      const { data: authUser } = await supabase.auth.getUser();

      if (
        authUser?.user?.email_confirmed_at &&
        profileData.email_verified === false
      ) {
        await supabase
          .from("profiles")
          .update({ email_verified: true })
          .eq("user_id", session.user.id);

        // refresh profile after update
        profileData.email_verified = true;
      }

      setProfile(profileData);
      setRole(profileData.role);

      // 4️⃣ Role-specific completion checks
      if (profileData.role === "student") {
        const { data } = await supabase
          .from("student_assessments")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);

        setStudentDone(!!data && data.length > 0);
      }

      if (profileData.role === "entrepreneur") {
        const { data } = await supabase
          .from("entrepreneur_stages")
          .select("id")
          .eq("user_id", session.user.id)
          .limit(1);

        setEntrepreneurDone(!!data && data.length > 0);
      }

      if (profileData.role === "mentor") {
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

      {profile?.email_verified === false && (
        <div className="border p-3 rounded bg-yellow-50 text-sm">
          ⚠️ Please verify your email to unlock full features.
        </div>
      )}

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
            href={
              entrepreneurDone
                ? "/entrepreneur/result"
                : "/entrepreneur/stage"
            }
            className="block border p-4 rounded hover:bg-gray-100"
          >
            🚀 Business Stage
            <p className="text-sm text-gray-600">
              {entrepreneurDone
                ? "Completed ✓"
                : "Tell us where your business stands"}
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
            href={
              mentorProfileExists
                ? "/mentor/profile/view"
                : "/mentor/profile"
            }
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
          </Link>
        </div>
      )}
    </div>
  );
}
