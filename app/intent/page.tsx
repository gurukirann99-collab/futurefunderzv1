"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function IntentPage() {
  const params = useSearchParams();
  const goal = params.get("goal");

  return (
    <div className="p-8 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">What are you looking for?</h1>

      {/* CAREER */}
      {goal === "career" && (
        <>
          <Link href="/career/discovery" className="block card">
            Get career clarity
          </Link>
          <Link href="/learning/courses" className="block card">
            Start learning skills
          </Link>
        </>
      )}

      {/* WORK */}
      {goal === "work" && (
        <>
          <Link href="/work/projects" className="block card">
            Practice with projects
          </Link>
          <Link href="/work/internships" className="block card">
            Find internships
          </Link>
          <Link href="/work/jobs" className="block card">
            Apply for jobs
          </Link>
        </>
      )}

      {/* FALLBACK */}
      {!goal && (
        <Link href="/explore" className="block card">
          Start from explore
        </Link>
      )}
    </div>
  );
}
