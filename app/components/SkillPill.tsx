import Link from "next/link";

export default function SkillPill({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  return (
    <Link
      href={`/student/skills/${slug}`}
      className="px-3 py-1 text-xs rounded-full border border-[var(--border)] hover:bg-[var(--card)]"
    >
      {name}
    </Link>
  );
}
