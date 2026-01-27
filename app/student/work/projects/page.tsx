import { getOpportunities } from "@/lib/opportunities";
import WorkList from "@/app/components/WorkList";

export default async function ProjectsPage() {
  const opportunities = await getOpportunities("project");

  return (
    <WorkList
      title="Projects"
      opportunities={opportunities}
    />
  );
}
