import Link from "next/link";

export default function SkillCard({
  name,
  slug,
  type,
}: {
  name: string;
  slug: string;
  type: string;
}) {
  return (
    <Link
      href={`/student/skills/${slug}`}
      className="block border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg)] transition"
    >
      <h3 className="font-medium">{name}</h3>
      <p className="text-xs text-[var(--muted)] mt-1">
        {type.replace("_", " ")}
      </p>
    </Link>
  );
}
