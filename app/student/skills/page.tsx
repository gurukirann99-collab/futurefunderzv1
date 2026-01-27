import { getSkills } from "@/lib/skills";
import SkillCard from "@/app/components/SkillCard";
import Section from "@/app/components/Section";

export default async function SkillsPage() {
  const it = await getSkills("IT");
  const nonIt = await getSkills("NON_IT");
  const vocational = await getSkills("VOCATIONAL");
  const govt = await getSkills("GOVT");
  const soft = await getSkills("SOFT");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Skills</h1>

      <Section title="IT Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {it.map((s: any) => (
            <SkillCard key={s.id} name={s.name} slug={s.slug} type={s.skill_type} />
          ))}
        </div>
      </Section>

      <Section title="Non-IT Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nonIt.map((s: any) => (
            <SkillCard key={s.id} name={s.name} slug={s.slug} type={s.skill_type} />
          ))}
        </div>
      </Section>

      <Section title="Vocational / Govt Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...vocational, ...govt].map((s: any) => (
            <SkillCard key={s.id} name={s.name} slug={s.slug} type={s.skill_type} />
          ))}
        </div>
      </Section>

      <Section title="Soft Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {soft.map((s: any) => (
            <SkillCard key={s.id} name={s.name} slug={s.slug} type={s.skill_type} />
          ))}
        </div>
      </Section>
    </div>
  );
}
