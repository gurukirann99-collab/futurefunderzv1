import Link from "next/link";
import OpportunityBadge from "./OpportunityBadge";

export default function OpportunityCard({ opp }: { opp: any }) {
  const salary =
    opp.type === "job"
      ? `₹${opp.salary_min} – ₹${opp.salary_max}`
      : opp.stipend
      ? `Stipend ₹${opp.stipend}`
      : "Unpaid / Learning";

  return (
    <Link
      href={`/student/work/${opp.id}`}
      className="block border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg)] transition"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{opp.title}</h3>
        <OpportunityBadge type={opp.type} />
      </div>

      <p className="text-sm text-[var(--muted)] mt-2">
        Duration: {opp.duration || "Flexible"}
      </p>

      <p className="text-sm mt-1">{salary}</p>
    </Link>
  );
}
