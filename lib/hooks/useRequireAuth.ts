"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push(`/login?redirect=${pathname}`);
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  return { loading };
}
