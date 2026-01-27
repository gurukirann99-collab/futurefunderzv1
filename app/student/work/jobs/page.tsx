import { getOpportunities } from "@/lib/opportunities";
import WorkList from "@/app/components/WorkList";

export default async function JobsPage() {
  const opportunities = await getOpportunities("job");

  return (
    <WorkList title="Jobs" opportunities={opportunities} />
  );
}
