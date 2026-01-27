import { supabase } from "@/lib/supabase";

export async function requireAdmin(router: any) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  if (profile?.role !== "admin") {
    router.push("/role");
    return null;
  }

  return session;
}
