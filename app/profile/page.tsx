export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-xl text-[var(--text)]">
        <h1 className="text-2xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Your profile details will be available here in future updates.
        </p>

        <div className="border border-[var(--border)] rounded p-4 mt-6 text-sm text-[var(--muted)] bg-[var(--card)]">
          Profile editing is not enabled in V1.
        </div>
      </div>
    </div>
  );
}
