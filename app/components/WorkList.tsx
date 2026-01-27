import OpportunityCard from "./OpportunityCard";

export default function WorkList({
  title,
  opportunities,
}: {
  title: string;
  opportunities: any[];
}) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>

      {opportunities.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          No opportunities available right now.
        </p>
      )}

      <div className="grid gap-4">
        {opportunities.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>
    </div>
  );
}
