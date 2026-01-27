import { supabase } from "@/lib/supabase";

type SkillLevel = "basic" | "intermediate" | "advanced";

export async function markCourseCompleted({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) {
  // 1️⃣ Fetch skills linked to the course
  const { data: courseSkills, error } = await supabase
    .from("course_skills")
    .select("skill_id")
    .eq("course_id", courseId);

  if (error) {
    console.error("Failed to fetch course skills:", error);
    return;
  }

  if (!courseSkills || courseSkills.length === 0) {
    console.warn("No skills linked to this course");
    return;
  }

  // 2️⃣ Upsert each skill for the student (TEXT LEVELS)
  for (const s of courseSkills) {
    await supabase.from("student_skills").upsert(
      {
        user_id: userId,
        skill_id: s.skill_id,
        level: "basic" as SkillLevel, // ✅ TEXT LEVEL
        source: "course",
      },
      {
        onConflict: "user_id,skill_id",
      }
    );
  }
}
