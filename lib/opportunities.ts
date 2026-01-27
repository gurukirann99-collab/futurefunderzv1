import { supabase } from "@/lib/supabase";

/**
 * Get opportunities
 * Optional filter by type: job | internship | project | apprenticeship
 */
export async function getOpportunities(type?: string) {
  let query = supabase
    .from("opportunities")
    .select(`
      id,
      title,
      type,
      duration,
      stipend,
      salary_min,
      salary_max
    `)
    .order("created_at", { ascending: false });

  // ✅ Apply filter only if type is passed
  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

/**
 * Get single opportunity
 */
export async function getOpportunityById(id: string) {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Apply to an opportunity
 */
export async function applyToOpportunity(
  opportunityId: string,
  userId: string
) {
  const { error } = await supabase.from("applications").insert({
    opportunity_id: opportunityId,
    user_id: userId,
  });

  if (error) throw error;
}
