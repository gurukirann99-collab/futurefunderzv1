import { supabase } from "@/lib/supabase";

type SkillLevel = "basic" | "intermediate" | "advanced";

export async function getCareerReadiness(
  userId: string,
  careerId: string
): Promise<number> {
  // 1️⃣ Required skills for the career
  const { data: required, error: reqError } = await supabase
    .from("career_skills")
    .select("skill_id")
    .eq("career_id", careerId);

  if (reqError || !required || required.length === 0) {
    console.warn("No required skills found for career");
    return 0;
  }

  // 2️⃣ Skills learned by the student
  const { data: learned, error: learnError } = await supabase
    .from("student_skills")
    .select("skill_id, level")
    .eq("user_id", userId);

  if (learnError || !learned) {
    console.warn("No learned skills found for user");
    return 0;
  }

  // 3️⃣ Scoring logic (TEXT LEVELS)
  let score = 0;

  required.forEach((r) => {
    const s = learned.find((l) => l.skill_id === r.skill_id);
    if (!s) return;

    switch (s.level as SkillLevel) {
      case "advanced":
        score += 1;
        break;
      case "intermediate":
        score += 0.7;
        break;
      case "basic":
        score += 0.4;
        break;
      default:
        // Unknown or null level → no credit
        break;
    }
  });

  // 4️⃣ Normalize to percentage
  return Math.round((score / required.length) * 100);
}
