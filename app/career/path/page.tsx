"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CareerPathPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<string | null>(null);

  useEffect(() => {
    const loadCareerPath = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const { data } = await supabase
        .from("student_assessments")
        .select("career_clarity")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!data || data.length === 0) {
        router.replace("/career/discovery");
        return;
      }

      setStage(data[0].career_clarity);
      setLoading(false);
    };

    loadCareerPath();
  }, [router]);

  if (loading) return <p className="p-8">Loading your path...</p>;

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Your Career Path
      </h1>

      {/* ===== EXPLORATION ===== */}
      {stage === "exploration" && (
        <div className="space-y-4">
          <p className="text-gray-700">
            You’re at the exploration stage.  
            The goal right now is to understand basics and try things without pressure.
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Learn foundational skills</li>
            <li>Explore different domains</li>
            <li>Try small projects</li>
          </ul>

          <Link
            href="/learning/courses"
            className="block text-center bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
          >
            Start Learning
          </Link>
        </div>
      )}

      {/* ===== FOCUS ===== */}
      {stage === "focus" && (
        <div className="space-y-4">
          <p className="text-gray-700">
            You have some clarity.  
            Now it’s time to build job-ready skills and gain confidence.
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Follow a focused skill path</li>
            <li>Practice with guided projects</li>
            <li>Prepare for real opportunities</li>
          </ul>

          <Link
            href="/learning/courses"
            className="block text-center bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
          >
            Continue Learning
          </Link>
        </div>
      )}

      {/* ===== EXECUTION ===== */}
      {stage === "execution" && (
        <div className="space-y-4">
          <p className="text-gray-700">
            You’re ready to apply your skills.  
            The focus now is getting real-world experience.
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Apply to projects or internships</li>
            <li>Look for entry-level roles</li>
            <li>Track applications</li>
          </ul>

          <Link
            href="/work/projects"
            className="block text-center bg-green-600 text-white rounded p-3 hover:bg-green-700"
          >
            Find Opportunities
          </Link>
        </div>
      )}

      {/* SAFETY */}
      {!stage && (
        <div className="text-center">
          <Link
            href="/career/discovery"
            className="text-blue-600 underline"
          >
            Start career discovery
          </Link>
        </div>
      )}
    </div>
  );
}
