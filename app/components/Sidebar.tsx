import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-56 border-r min-h-screen p-4">
      <h2 className="font-bold text-lg mb-6">
        FutureFunderz
      </h2>

      <nav className="space-y-3 text-sm">
        <Link
          href="/dashboard"
          className="block hover:underline"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/journey"
          className="block hover:underline"
        >
          My Journey
        </Link>

        <Link
          href="/dashboard/resources"
          className="block hover:underline"
        >
          Resources
        </Link>

        <Link
          href="/dashboard/help"
          className="block hover:underline"
        >
          Help
        </Link>
      </nav>
    </aside>
  );
}
