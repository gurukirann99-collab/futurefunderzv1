"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, useRef } from "react";
import {
  School,
  GraduationCap,
  BookOpen,
  Briefcase,
} from "lucide-react";

/* ================= PAGE ================= */

export default function LandingPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center space-y-6">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Make life decisions with clarity
          </h1>

          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Schools, colleges, skills, careers, and jobs —
            connected into one guided system.
          </p>
      
          <div className="absolute top-6 right-6">
  </div>


          {/* HERO CTA = GUIDED ENTRY */}
          <Link
            href="/guidance/explore"
            className="inline-flex items-center gap-2
                       bg-white text-blue-700
                       px-10 py-4 rounded-xl
                       font-semibold hover:bg-blue-50"
          >
            Start guided exploration →
          </Link>

          <p className="text-sm opacity-80">
            Not sure where to begin? We’ll guide you step by step.
          </p>
        </div>
      </section>

      {/* ================= FLIP CARDS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Or explore directly
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">

            <FlipCard
              icon={<School size={34} />}
              title="Schools"
              back="Admissions, safety, trust & neighbourhood signals"
              href="/explore/schools"
            />

            <FlipCard
              icon={<GraduationCap size={34} />}
              title="Colleges"
              back="Fees, placements, ROI & outcomes"
              href="/explore/colleges"
            />

            <FlipCard
              icon={<BookOpen size={34} />}
              title="Skills"
              back="Job-ready & business-ready skills"
              href="/explore/skills"
            />

            <FlipCard
              icon={<Briefcase size={34} />}
              title="Jobs"
              back="Roles, salaries & growth paths"
              href="/explore/jobs"
            />

          </div>
        </div>
      </section>

      {/* ================= COUNTING METRICS ================= */}
      <section className="py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">

          <Counter value={120} label="Career paths mapped" suffix="+" />
          <Counter value={500} label="Skills aligned to outcomes" suffix="+" />
          <Counter value={50} label="Institutions & employers" suffix="+" />
          <Counter value={100} label="India-first system" suffix="%" />

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-28 text-center bg-[var(--bg)]">
        <h2 className="text-3xl font-bold mb-4">
          Still figuring things out?
        </h2>

        <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
          You don’t need to decide everything today.
          Start with clarity — we’ll guide you step by step.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/guidance/explore"
            className="px-10 py-4 rounded-xl bg-blue-600
                       text-white font-semibold hover:bg-blue-700"
          >
            Start guided clarity →
          </Link>

          <Link
            href="/explore"
            className="px-8 py-4 rounded-xl border
                       border-blue-600 text-blue-600
                       font-medium hover:bg-blue-50"
          >
            Just explore on my own
          </Link>
        </div>
      </section>

      {/* Footer is global — do NOT repeat here */}

    </main>
  );
}

/* ================= FLIP CARD ================= */

function FlipCard({
  icon,
  title,
  back,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  back: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div
        className="relative w-[220px] h-[240px]"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative w-full h-full
                     transition-transform duration-500
                     [transform-style:preserve-3d]
                     hover:[transform:rotateY(180deg)]"
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 bg-[var(--bg)]
                       border border-[var(--border)]
                       rounded-2xl flex flex-col
                       items-center justify-center
                       space-y-3 backface-hidden"
          >
            <div className="text-blue-600">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 bg-blue-600
                       text-white rounded-2xl p-6
                       flex items-center justify-center
                       text-center backface-hidden
                       [transform:rotateY(180deg)]"
          >
            <p className="text-sm">{back}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ================= COUNTER ================= */

function Counter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let current = 0;
    const step = Math.ceil(value / 60);

    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="bg-[var(--bg)] border border-[var(--border)]
                 rounded-2xl p-6 text-center"
    >
      <div className="text-3xl font-bold text-blue-600">
        {count}{suffix}
      </div>
      <div className="text-sm text-[var(--muted)] mt-1">
        {label}
      </div>
    </div>
  );
}
