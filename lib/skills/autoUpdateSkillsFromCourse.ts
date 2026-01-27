import { supabase } from "@/lib/supabase";

export async function autoUpdateSkillsFromCourse(
  userId: string,
  courseId: string
) {
  // 1️⃣ Get skills linked to this course
  const { data: courseSkills } = await supabase
    .from("course_skills")
    .select("skill_id")
    .eq("course_id", courseId);

  if (!courseSkills || courseSkills.length === 0) return;

  for (const cs of courseSkills) {
    // 2️⃣ Count how many completed courses teach this skill
    const { count } = await supabase
      .from("course_skills")
      .select("course_id", { count: "exact", head: true })
      .eq("skill_id", cs.skill_id);

    let level: "beginner" | "intermediate" | "advanced" = "beginner";
    if ((count || 0) >= 3) level = "advanced";
    else if ((count || 0) >= 2) level = "intermediate";

    // 3️⃣ Upsert student skill
    await supabase.from("student_skills").upsert(
      {
        user_id: userId,
        skill_id: cs.skill_id,
        level,
      },
      { onConflict: "user_id,skill_id" }
    );
  }
}
