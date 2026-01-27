export default function SkillBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs border border-[var(--border)] bg-[var(--card)]">
      {name}
    </span>
  );
}
