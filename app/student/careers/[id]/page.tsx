import { getCareerById } from "@/lib/career";

import SkillBadge from "@/app/components/SkillBadge";

export default async function StudentCareerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const career = await getCareerById(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{career.title}</h1>
        <p className="text-[var(--muted)] mt-1">
          Domain: {career.domain || "General"}
        </p>
      </div>

      {/* Salary */}
      <section>
        <h2 className="font-semibold text-lg mb-2">
          Salary Progression
        </h2>
        <div className="space-y-2">
          {career.career_salary_ladders?.map((s: any, i: number) => (
            <div
              key={i}
              className="border border-[var(--border)] rounded-lg p-3 text-sm"
            >
              {s.experience_level}: ₹{s.min_salary} – ₹{s.max_salary}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="font-semibold text-lg mb-2">
          Skills Required
        </h2>
        <div className="flex flex-wrap gap-2">
          {career.career_skills?.map((s: any, i: number) => (
            <SkillBadge key={i} name={s.skill} />
          ))}
        </div>
      </section>

      {/* Employers */}
      <section>
        <h2 className="font-semibold text-lg mb-2">
          Top Employers
        </h2>
        <ul className="list-disc ml-5 text-sm">
          {career.career_employers?.map((e: any, i: number) => (
            <li key={i}>{e.employer_name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
