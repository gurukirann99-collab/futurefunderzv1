export default function ComingSoon({ role }: { role: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="text-center space-y-3 bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          {role} dashboard coming soon 🚧
        </h1>

        <p className="text-sm text-[var(--muted)]">
          We’re building this carefully. Stay tuned.
        </p>
      </div>
    </div>
  );
}
