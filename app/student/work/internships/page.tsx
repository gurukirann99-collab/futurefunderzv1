import { getOpportunities } from "@/lib/opportunities";
import WorkList from "@/app/components/WorkList";

export default async function InternshipsPage() {
  const opportunities = await getOpportunities("internship");

  return (
    <WorkList
      title="Internships"
      opportunities={opportunities}
    />
  );
}
