import Link from "next/link";

export default function CareerCard({
  id,
  title,
  salary,
}: {
  id: string;
  title: string;
  salary: string;
}) {
  return (
    <Link
      href={`/student/careers/${id}`}
      className="block border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg)] transition"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-[var(--muted)] mt-1">
        Avg Salary: {salary}
      </p>
    </Link>
  );
}
