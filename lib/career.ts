import { supabase } from "@/lib/supabase";

export async function getCareers() {
  const { data, error } = await supabase
    .from("careers")
    .select(`
      id,
      title,
      domain,
      career_salary_ladders (
        min_salary,
        max_salary
      )
    `)
    .order("title");

  if (error) throw error;
  return data;
}

export async function getCareerById(id: string) {
  const { data, error } = await supabase
    .from("careers")
    .select(`
      id,
      title,
      domain,
      career_salary_ladders (
        experience_level,
        min_salary,
        max_salary
      ),
      career_skills (
        skill,
        level
      ),
      career_employers (
        employer_name
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
