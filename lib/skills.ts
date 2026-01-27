import { supabase } from "@/lib/supabase";

/**
 * Get all skills (optionally by type)
 * skill_type: IT | NON_IT | VOCATIONAL | GOVT | SOFT
 */
export async function getSkills(skill_type?: string) {
  let query = supabase
    .from("skills")
    .select("id, name, skill_type, slug")
    .order("name");

  if (skill_type) {
    query = query.eq("skill_type", skill_type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/**
 * Get single skill by slug with linked careers & courses
 */
export async function getSkillBySlug(slug: string) {
  const { data, error } = await supabase
    .from("skills")
    .select(`
      id,
      name,
      description,
      skill_type,
      career_skills (
        careers (
          id,
          title,
          domain
        )
      ),
      course_skills (
        courses (
          id,
          title,
          level
        )
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}
