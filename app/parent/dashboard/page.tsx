"use client";

import Link from "next/link";

export default function ParentDashboard() {
  return (
    <div className="p-8 space-y-8 text-[var(--text)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Parent Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">
          Track your child’s education and career journey
        </p>
      </div>

      {/* Key Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card)] border rounded-xl p-5">
          <h3 className="font-semibold">Career Direction</h3>
          <p className="text-sm text-[var(--muted)] mt-1">
            View your child’s chosen career path
          </p>
        </div>

        <div className="bg-[var(--card)] border rounded-xl p-5">
          <h3 className="font-semibold">Learning Progress</h3>
          <p className="text-sm text-[var(--muted)] mt-1">
            Courses, skills & completion status
          </p>
        </div>

        <div className="bg-[var(--card)] border rounded-xl p-5">
          <h3 className="font-semibold">Education Planning</h3>
          <p className="text-sm text-[var(--muted)] mt-1">
            Colleges, fees, scholarships & loans
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-[var(--card)] border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link href="/parent/children" className="underline">
            View Child Profile
          </Link>
          <Link href="/parent/colleges" className="underline">
            Explore Colleges
          </Link>
          <Link href="/parent/loans" className="underline">
            Education Loans
          </Link>
        </div>
      </div>
    </div>
  );
}
