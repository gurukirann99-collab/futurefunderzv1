import { supabase } from "@/lib/supabase";

type Skill = { id: string; name: string };
type Course = { id: string; title: string };

export async function calculateSkillGap({
  userId,
  entityId,
  type, // "job" | "internship" | "project" | "career"
}: {
  userId: string;
  entityId: string;
  type: "job" | "internship" | "project" | "career";
}) {
  /* 1️⃣ Required skills */
  const table =
    type === "career"
      ? "career_skills"
      : type === "job"
      ? "job_skills"
      : "opportunity_skills";

  const column =
    type === "career" ? "career_id" : "job_id";

  const { data: req } = await supabase
    .from(table)
    .select(`skills:skill_id(id,name)`)
    .eq(column, entityId);

  const required: Skill[] =
    req?.map((r: any) => r.skills).filter(Boolean) || [];

  /* 2️⃣ Student learned skills */
  const { data: learnedData } = await supabase
    .from("student_skills")
    .select(`skills:skill_id(id,name)`)
    .eq("user_id", userId);

  const learned: Skill[] =
    learnedData?.map((l: any) => l.skills).filter(Boolean) || [];

  /* 3️⃣ Match + readiness */
  const matched = required.filter((r) =>
    learned.some((l) => l.id === r.id)
  ).length;

  const readiness =
    required.length === 0
      ? 0
      : Math.round((matched / required.length) * 100);

  /* 4️⃣ Missing skills */
  const missingIds = required
    .filter((r) => !learned.some((l) => l.id === r.id))
    .map((s) => s.id);

  /* 5️⃣ Recommended courses */
  let courses: Course[] = [];

  if (missingIds.length > 0) {
    const { data } = await supabase
      .from("course_skills")
      .select(`courses:course_id(id,title)`)
      .in("skill_id", missingIds);

    const unique = new Map<string, Course>();
    data?.forEach((r: any) => {
      if (r.courses) unique.set(r.courses.id, r.courses);
    });

    courses = [...unique.values()];
  }

  return {
    readiness,
    canApply: readiness >= 70,
    required,
    learned,
    courses,
  };
}
