import { supabase } from "@/lib/supabase";
import { mockSchools } from "../data/schools.mock";
import { School } from "../types/schools";


export async function getSchools(): Promise<School[]> {
  try {
    const { data, error } = await supabase
      .from("schools")
      .select("id, name, area, board")
      .limit(20);

    if (error || !data || data.length === 0) {
      return mockSchools;
    }

    return data;
  } catch {
    return mockSchools;
  }
}
