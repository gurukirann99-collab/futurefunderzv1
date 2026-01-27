"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* =====================================================
   COUNT UP ONLY WHEN USER SCROLLS NEAR CTA
===================================================== */
function useCountUpOnView(target: number) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let current = 0;
        const step = Math.ceil(target / 40);

        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setCount(current);
        }, 30);

        observer.disconnect();
      },
      { threshold: 0.75 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return { ref, count };
}

/* =====================================================
   PAGE
===================================================== */
export default function LandingPage() {
  return (
    <main className="bg-[var(--bg)] text-[var(--text)] overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Education → Skills → Income
          </h1>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Built for students, parents, professionals, and founders in India.
          </p>
          <Link
            href="/guidance/explore"
            className="inline-block bg-white text-[var(--primary)]
                       px-8 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Start from where you are
          </Link>
        </div>
      </section>

      {/* ================= LIFE PATH (CENTERED) ================= */}
      <section className="py-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Your life journey
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-6
                        px-[calc(50vw-130px)]
                        snap-x snap-mandatory scrollbar-hide">
          <LifeCard
            icon="🏫"
            title="School"
            desc="Environment, safety, teachers, facilities"
            links={[{ label: "Explore schools", href: "/admissions/schools" }]}
          />
          <LifeCard
            icon="🎓"
            title="College"
            desc="Degrees, ROI, placements, outcomes"
            links={[{ label: "Explore colleges", href: "/admissions/colleges" }]}
          />
          <LifeCard
            icon="📘"
            title="Skills"
            desc="Job & business aligned skills"
            links={[{ label: "Browse courses", href: "/courses" }]}
          />
          <LifeCard
            icon="💼"
            title="Jobs & Income"
            desc="Internships, jobs, salary growth"
            links={[{ label: "Find jobs", href: "/jobs" }]}
          />
        </div>
      </section>

      {/* ================= PARENTS ================= */}
      <section className="py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10">
            Designed for Indian parents
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "📍", text: "5km neighbourhood schools" },
              { icon: "👩‍🏫", text: "Teacher credibility & stability" },
              { icon: "⚽", text: "Playground & facilities" },
              { icon: "👪", text: "Parent & community feedback" },
            ].map((item) => (
              <motion.div
                key={item.text}
                whileHover={{ y: -6 }}
                className="bg-[var(--bg)] border border-[var(--border)]
                           rounded-2xl p-6 space-y-2"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="text-sm">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUNDER JOURNEY (TRAIN) ================= */}
      <section className="py-24">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Founder journey
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {FOUNDER_STEPS.concat(FOUNDER_STEPS).map((step, i) => (
              <div
                key={i}
                className="min-w-[240px] bg-[var(--primary)]
                           text-white rounded-2xl p-6 text-center shadow"
              >
                <div className="text-xs opacity-80 mb-2">
                  STEP {(i % FOUNDER_STEPS.length) + 1}
                </div>
                <div className="font-medium">{step}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= METRICS (TRIGGER ON SCROLL) ================= */}
      <section className="py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          <Metric label="Skills aligned to jobs" value={500} suffix="+" />
          <Metric label="Career paths mapped" value={120} suffix="+" />
          <Metric label="Institutions onboarded" value={50} suffix="+" />
          <Metric label="India-first design" value={100} suffix="%" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Wherever you are, there is a next step.
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Start with clarity. Move with confidence.
        </p>
        <Link
          href="/guidance/explore"
          className="inline-block bg-[var(--primary)]
                     text-white px-10 py-4 rounded-xl font-medium"
        >
          Begin your journey →
        </Link>
      </section>

    </main>
  );
}

/* =====================================================
   COMPONENTS
===================================================== */

const FOUNDER_STEPS = [
  "Idea validation",
  "Skill building",
  "Business registration",
  "Early revenue",
  "Funding & scale",
  "Hiring & growth",
];

function LifeCard({
  icon,
  title,
  desc,
  links,
}: {
  icon: string;
  title: string;
  desc: string;
  links: { label: string; href: string }[];
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group min-w-[260px] snap-center
                 bg-[var(--card)] border border-[var(--border)]
                 rounded-2xl p-6 space-y-3"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-[var(--muted)]">{desc}</p>

      <div className="pt-2 space-y-1 opacity-0
                      group-hover:opacity-100 transition">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="block text-sm text-[var(--primary)]"
          >
            {l.label} →
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function Metric({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  const { ref, count } = useCountUpOnView(value);

  return (
    <div
      ref={ref}
      className="bg-[var(--bg)] border border-[var(--border)]
                 rounded-2xl p-6 text-center"
    >
      <div className="text-3xl font-bold text-[var(--primary)]">
        {count}{suffix}
      </div>
      <div className="text-sm text-[var(--muted)] mt-1">
        {label}
      </div>
    </div>
  );
}
