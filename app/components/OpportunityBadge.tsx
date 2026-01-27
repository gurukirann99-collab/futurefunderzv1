export default function OpportunityBadge({ type }: { type: string }) {
  const colors: any = {
    project: "bg-blue-100 text-blue-700",
    internship: "bg-green-100 text-green-700",
    apprenticeship: "bg-yellow-100 text-yellow-700",
    job: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[type] || "bg-gray-100"
      }`}
    >
      {type.toUpperCase()}
    </span>
  );
}
