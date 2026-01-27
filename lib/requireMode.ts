import { supabase } from "@/lib/supabase";

export async function requireMode(
  router: any,
  allowedModes: string[]
) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.replace("/auth/login");
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("active_mode")
    .eq("user_id", session.user.id)
    .single();

  if (!profile || !allowedModes.includes(profile.active_mode)) {
    router.replace("/dashboard");
    return null;
  }

  return session;
}
