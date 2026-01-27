import { getCareers } from "@/lib/career";
import CareerCard from "@/app/components/CareerCard";

export default async function StudentCareersPage() {
  const careers = await getCareers();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Careers (Salary & Employer First)
      </h1>

      <p className="text-sm text-[var(--muted)]">
        Explore careers based on salary growth, demand, and employers.
      </p>

      <div className="grid gap-4">
        {careers?.map((career: any) => {
          const salary = career.career_salary_ladders?.[0]
            ? `₹${career.career_salary_ladders[0].min_salary} – ₹${career.career_salary_ladders[0].max_salary}`
            : "Salary data coming soon";

          return (
            <CareerCard
              key={career.id}
              id={career.id}
              title={career.title}
              salary={salary}
            />
          );
        })}
      </div>
    </div>
  );
}
