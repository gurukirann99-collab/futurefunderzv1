"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  // 🔥 AUTH GUARD FOR LANDING PAGE
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        router.replace("/dashboard"); // or /auth/post-login
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main className="bg-[var(--bg)] min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-[var(--text)] leading-tight">
            Not sure what to do next?
            <br />
            <span className="text-[var(--primary)]">
              We help you move forward.
            </span>
          </h1>

          <p className="text-lg text-[var(--muted)]">
            Whether you’re confused about your career, learning skills,
            or finding opportunities — FutureFunderz guides you step by step.
          </p>

          <Link
            href="/guidance/explore"
            className="inline-block bg-[var(--primary)] text-white px-10 py-4 rounded-xl text-lg font-medium hover:opacity-90 transition"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* JOURNEY CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-[var(--card)] rounded-2xl shadow-sm p-6 space-y-4 border-t-4 border-[var(--primary)]"
            >
              <div className="text-[var(--primary)] text-2xl font-bold">
                {String(n).padStart(2, "0")}
              </div>

              <h3 className="text-xl font-semibold text-[var(--text)]">
                {n === 1 && "Understand yourself"}
                {n === 2 && "Build the right skills"}
                {n === 3 && "Apply to opportunities"}
              </h3>

              <p className="text-sm text-[var(--muted)]">
                {n === 1 &&
                  "Get clarity on where you are, what interests you, and what direction makes sense — without pressure."}
                {n === 2 &&
                  "Focus only on skills that actually help you grow, practice with real projects, and gain confidence."}
                {n === 3 &&
                  "Move into internships, projects, and entry-level jobs when you’re ready — not before."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* REASSURANCE CARD */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            This is not another course platform.
          </h2>
          <p className="text-[var(--muted)]">
            We don’t force decisions, sell false promises, or overwhelm you.
            You move forward only when you’re ready.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-[var(--primary)] rounded-2xl p-10 text-center space-y-6 text-white">
          <h2 className="text-3xl font-semibold">
            Take the first step today
          </h2>

          <p className="opacity-90">
            No pressure. No confusion. Just guidance.
          </p>

          <Link
            href="/guidance/explore"
            className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-medium hover:opacity-90"
          >
            Start exploring
          </Link>
        </div>
      </section>
    </main>
  );
}
