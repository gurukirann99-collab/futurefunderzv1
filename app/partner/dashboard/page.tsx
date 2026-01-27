"use client";

import Link from "next/link";

export default function PartnerDashboard() {
  return (
    <div className="p-8 space-y-10 text-[var(--text)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Partner Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">
          Manage admissions, programs, opportunities, and impact
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat title="Active Applications" value="—" />
        <Stat title="Programs / Listings" value="—" />
        <Stat title="Accepted Students" value="—" />
        <Stat title="Impact Score" value="—" />
      </div>

      {/* Core Partner Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Admissions"
          description="Review applications, shortlist and accept students"
          href="/partner/admissions"
        />

        <ModuleCard
          title="Courses & Programs"
          description="Create and manage courses, training programs"
          href="/partner/courses"
        />

        <ModuleCard
          title="Jobs & Internships"
          description="Post jobs, internships and manage candidates"
          href="/partner/jobs"
        />

        <ModuleCard
          title="Scholarships & CSR"
          description="Offer scholarships, CSR programs and free seats"
          href="/partner/scholarships"
        />

        <ModuleCard
          title="Loans & Finance"
          description="Manage education loan products and applications"
          href="/partner/loans"
        />

        <ModuleCard
          title="Analytics"
          description="View performance, demand and outcome insights"
          href="/partner/analytics"
        />
      </div>

      {/* Trust & Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModuleCard
          title="Partner Profile & Compliance"
          description="Organization profile, verification and documents"
          href="/partner/profile"
        />

        <ModuleCard
          title="Notifications & Updates"
          description="System alerts, application updates and messages"
          href="/partner/notifications"
        />
      </div>
    </div>
  );
}

/* -------------------- UI COMPONENTS -------------------- */

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
      <p className="text-sm text-[var(--muted)]">{title}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:shadow transition block"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-[var(--muted)] mt-1">
        {description}
      </p>
      <p className="text-sm text-[var(--primary)] mt-3">
        Open →
      </p>
    </Link>
  );
}
