"use client";

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 text-[var(--text)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">
          Platform overview & control center
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Metric title="Total Users" />
        <Metric title="Students" />
        <Metric title="Parents" />
        <Metric title="Partners" />
        <Metric title="Mentors" />
      </div>

      {/* Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel
          title="User Management"
          desc="View users, roles, and activity"
        />

        <Panel
          title="Content & Programs"
          desc="Courses, careers, and data control"
        />
      </div>

      {/* System */}
      <div className="bg-[var(--card)] border rounded-xl p-6">
        <h3 className="font-semibold">System Status</h3>
        <p className="text-sm text-[var(--muted)] mt-1">
          All services operational
        </p>
      </div>
    </div>
  );
}

function Metric({ title }: { title: string }) {
  return (
    <div className="bg-[var(--card)] border rounded-xl p-5">
      <p className="text-sm text-[var(--muted)]">{title}</p>
      <p className="text-xl font-bold">—</p>
    </div>
  );
}

function Panel({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-[var(--card)] border rounded-xl p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-[var(--muted)] mt-1">
        {desc}
      </p>
    </div>
  );
}
