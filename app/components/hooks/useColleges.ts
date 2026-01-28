import { supabase } from "@/lib/supabase";
import { mockColleges } from "../data/colleges.mock";
import { College } from "../types/colleges";


export async function getColleges(): Promise<College[]> {
  try {
    const { data, error } = await supabase
      .from("colleges")
      .select("id, name, course, avgPlacement")
      .limit(20);

    if (error || !data || data.length === 0) {
      return mockColleges;
    }

    return data;
  } catch {
    return mockColleges;
  }
}
