"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "My Journey", href: "/dashboard/journey", icon: "🧭" },
  { label: "Learning", href: "/learning/progress", icon: "📘" },
  { label: "Work", href: "/work/projects", icon: "💼" },
];

const secondaryItems = [
  { label: "Resources", href: "/dashboard/resources" },
  { label: "Help", href: "/dashboard/help" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--bg)] border-r border-[var(--border)] fixed inset-y-0 left-0 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[var(--border)]">
        <h2 className="text-lg font-bold tracking-tight text-[var(--text)]">
          FutureFunderz
        </h2>
        <p className="text-xs text-[var(--muted)]">
          Career → Learning → Work
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active
                  ? "bg-[rgba(99,102,241,0.15)] text-[var(--primary)] font-medium"
                  : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--text)]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Secondary */}
      <div className="px-4 py-4 border-t border-[var(--border)] text-sm space-y-2">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--text)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
