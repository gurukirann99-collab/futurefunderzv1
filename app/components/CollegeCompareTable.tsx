"use client";

export default function CollegeCompareTable({ colleges }: { colleges: any[] }) {
  if (!colleges.length) return null;

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-[var(--card)]">
          <tr>
            <th className="p-3 text-left">Criteria</th>
            {colleges.map((c) => (
              <th key={c.id} className="p-3 text-left">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <Row label="City" values={colleges.map(c => c.city)} />
          <Row label="Annual Fees (₹)" values={colleges.map(c => c.fees)} />
          <Row label="Avg Package (₹)" values={colleges.map(c => c.avg_package)} />
          <Row
            label="Outcome Ratio"
            values={colleges.map(c =>
              c.fees ? (c.avg_package / c.fees).toFixed(2) : "—"
            )}
          />
        </tbody>
      </table>
    </div>
  );
}

function Row({ label, values }: { label: string; values: any[] }) {
  return (
    <tr className="border-t">
      <td className="p-3 font-medium">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="p-3">
          {v ?? "—"}
        </td>
      ))}
    </tr>
  );
}
