export default function ComingSoon({ role }: { role: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold">
          {role} dashboard coming soon 🚧
        </h1>
        <p className="text-sm text-gray-600">
          We’re building this carefully. Stay tuned.
        </p>
      </div>
    </div>
  );
}
