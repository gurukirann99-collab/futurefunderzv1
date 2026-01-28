import SchoolsExplorer from "@/app/components/explorers/SchoolsExplorer";
import { getSchools } from "@/app/components/hooks/useSchools";
import Link from "next/link";

export default async function ExploreSchoolsPage() {
  const schools = await getSchools();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Explore schools near you
        </h1>
        <p className="text-[var(--muted)]">
          Compare schools by safety, teachers, facilities, and neighbourhood trust
          — no pressure to apply.
        </p>
      </header>

      {/* SCHOOLS EXPLORER */}
      <SchoolsExplorer mode="explore" schools={schools} />

      {/* SOFT EXIT TO GUIDANCE (OPTIONAL) */}
      <div className="border-t pt-6 text-center">
        <p className="text-sm text-[var(--muted)]">
          Feeling unsure?
          <Link
            href="/guidance/explore?domain=schools"
            className="underline ml-1"
          >
            Get guided help
          </Link>
        </p>
      </div>

    </div>
  );
}
