"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    label: "My Journey",
    href: "/dashboard/journey",
    icon: "🧭",
  },
  {
    label: "Learning",
    href: "/learning/progress",
    icon: "📘",
  },
  {
    label: "Work",
    href: "/work/projects",
    icon: "💼",
  },
];

const secondaryItems = [
  {
    label: "Resources",
    href: "/dashboard/resources",
  },
  {
    label: "Help",
    href: "/dashboard/help",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r fixed inset-y-0 left-0 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b">
        <h2 className="text-lg font-bold tracking-tight">
          FutureFunderz
        </h2>
        <p className="text-xs text-gray-500">
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
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                  active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Secondary */}
      <div className="px-4 py-4 border-t text-sm space-y-2">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
