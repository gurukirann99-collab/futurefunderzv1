"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackInner() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const handle = async () => {
      const code = params.get("code");

      if (!code) {
        router.replace("/login");
        return;
      }

      const { error } =
        await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth callback error:", error.message);
        router.replace("/login");
        return;
      }

      router.replace("/dashboard");
    };

    handle();
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Signing you in...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Finalizing login...</p>
        </div>
      }
    >
      <CallbackInner />
    </Suspense>
  );
}
