import { supabase } from "@/lib/supabase";
import { mockSkills } from "../data/skills.mock";
import { Skill } from "../types/skills";


export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("id, name, outcome")
      .limit(20);

    if (error || !data || data.length === 0) {
      return mockSkills;
    }

    return data;
  } catch {
    return mockSkills;
  }
}
