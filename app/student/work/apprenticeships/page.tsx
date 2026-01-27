import { getOpportunities } from "@/lib/opportunities";
import WorkList from "@/app/components/WorkList";

export default async function ApprenticeshipsPage() {
  const opportunities = await getOpportunities("apprenticeship");

  return (
    <WorkList
      title="Apprenticeships"
      opportunities={opportunities}
    />
  );
}
