import { supabase } from "@/lib/supabase";
import { mockJobs } from "../data/jobs.mock";
import { Job } from "../types/jobs";

export async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("id, title, company, salary")
      .limit(20);

    if (error || !data || data.length === 0) {
      return mockJobs;
    }

    return data;
  } catch {
    return mockJobs;
  }
}
