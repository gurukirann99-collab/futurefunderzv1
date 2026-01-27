import { getSkillBySlug } from "@/lib/skills";
import Section from "@/app/components/Section";

import Link from "next/link";

export default async function SkillDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const skill = await getSkillBySlug(params.slug);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{skill.name}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {skill.skill_type.replace("_", " ")}
        </p>
      </div>

      {skill.description && (
        <p className="text-sm">{skill.description}</p>
      )}

      {/* Careers */}
      <Section title="Careers using this skill">
        {skill.career_skills?.length ? (
          <ul className="list-disc ml-5 text-sm">
            {skill.career_skills.map((cs: any, i: number) => (
              <li key={i}>
                <Link
                  href={`/student/careers/${cs.careers.id}`}
                  className="text-[var(--primary)] hover:underline"
                >
                  {cs.careers.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            No careers linked yet.
          </p>
        )}
      </Section>

      {/* Courses */}
      <Section title="Courses that teach this skill">
        {skill.course_skills?.length ? (
          <ul className="list-disc ml-5 text-sm">
            {skill.course_skills.map((cs: any, i: number) => (
              <li key={i}>{cs.courses.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Courses coming soon.
          </p>
        )}
      </Section>
    </div>
  );
}
