import SkillsExplorer from "@/app/components/explorers/SkillsExplorer";
import { getSkills } from "@/app/components/hooks/useSkills";
import Link from "next/link";

export default async function ExploreSkillsPage() {
  const skills = await getSkills();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Explore skills that pay
        </h1>
        <p className="text-[var(--muted)]">
          Skills mapped to jobs and business outcomes — no pressure to enroll.
        </p>
      </header>

      {/* SKILLS EXPLORER */}
      <SkillsExplorer mode="explore" skills={skills} />

      {/* SOFT EXIT TO GUIDANCE */}
      <div className="border-t pt-8 text-center space-y-3">
        <p className="text-sm text-[var(--muted)]">
          Not sure which skills are right for you?
        </p>

        <p className="text-sm text-[var(--muted)]">
        Feeling unsure?
        <Link href="/guidance/explore?domain=skills" className="underline ml-1">
          Get guided help
        </Link>
       </p>
      </div>
    </div>
  );
}
