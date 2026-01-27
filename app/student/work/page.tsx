import { getOpportunities } from "@/lib/opportunities";
import OpportunityCard from "@/app/components/OpportunityCard";

export default async function WorkPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">All Work Opportunities</h1>

      <div className="grid gap-4">
        {opportunities.map((opp: any) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
      </div>
    </div>
  );
}
