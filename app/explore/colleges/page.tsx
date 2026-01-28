import CollegesExplorer from "@/app/components/explorers/CollegesExplorer";
import { getColleges } from "@/app/components/hooks/useColleges";
import Link from "next/link";

export default async function ExploreCollegesPage() {
  const colleges = await getColleges();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Explore colleges & universities
        </h1>
        <p className="text-[var(--muted)]">
          Compare fees, placements, reputation, and ROI — no pressure to apply.
        </p>
      </header>

      {/* COLLEGES EXPLORER */}
      <CollegesExplorer mode="explore" colleges={colleges} />

      {/* SOFT EXIT TO GUIDANCE */}
      <div className="border-t pt-8 text-center space-y-3">
        <p className="text-sm text-[var(--muted)]">
          Confused between multiple colleges?
        </p>

        <p className="text-sm text-[var(--muted)]">
        Feeling unsure?
        <Link href="/guidance/explore?domain=colleges" className="underline ml-1">
        Get guided help
        </Link>
</p>      </div>

    </div>
  );
}
