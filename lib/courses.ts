import { supabase } from "@/lib/supabase";

/**
 * Get all courses with skills
 */
export async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      level,
      duration,
      course_skills (
        skills (
          id,
          name,
          slug
        )
      )
    `)
    .order("title");

  if (error) throw error;
  return data ?? [];
}

/**
 * Get single course
 */
export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      description,
      level,
      duration,
      course_skills (
        skills (
          id,
          name,
          slug
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
