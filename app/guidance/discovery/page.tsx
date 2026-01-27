"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BackButton from "@/app/components/BackButton";

type Education =
  | "school"
  | "college"
  | "graduate"
  | "working";

export default function CareerDiscoveryPage() {
  const router = useRouter();

  const [education, setEducation] = useState<Education | null>(null);
  const [interest, setInterest] = useState("");
  const [clarity, setClarity] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async () => {
    if (!education || !interest || !clarity) return;

    setLoading(true);

    let stage = "exploration";
    if (clarity === "mostly-clear") stage = "execution";
    else if (clarity === "somewhat-clear") stage = "focus";

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      await supabase.from("student_assessments").insert({
        user_id: session.user.id,
        career_clarity: stage,
        skill_level: interest,
      });

      await supabase.from("student_journey_history").insert({
        user_id: session.user.id,
        stage,
      });

      router.push("/student/dashboard");
      return;
    }

    localStorage.setItem(
      "pendingCareerDiscovery",
      JSON.stringify({ stage, interest })
    );

    router.push("/auth/signup?redirect=/student/dashboard");
  };

  /* ===============================
     INTEREST OPTIONS
  =============================== */
  const interestOptions: Record<Education, { label: string; value: string }[]> =
    {
      school: [
        { label: "🧮 Maths & puzzles", value: "logic" },
        { label: "🎨 Drawing & creativity", value: "creative" },
        { label: "🔬 Science & experiments", value: "science" },
        { label: "🗣️ Speaking & debating", value: "communication" },
        { label: "💻 Computers & games", value: "technology" },
        { label: "🤔 Not sure yet", value: "unsure" },
      ],
      college: [
        { label: "💻 Technology & coding", value: "technology" },
        { label: "📊 Business & management", value: "business" },
        { label: "🎨 Design & media", value: "creative" },
        { label: "🔬 Research & analysis", value: "research" },
        { label: "🤔 Still exploring", value: "unsure" },
      ],
      graduate: [
        { label: "💼 Corporate roles", value: "corporate" },
        { label: "🚀 Startups / entrepreneurship", value: "startup" },
        { label: "📚 Higher studies", value: "higher-studies" },
        { label: "🎯 Skill specialisation", value: "skills" },
        { label: "🤔 Unsure", value: "unsure" },
      ],
      working: [
        { label: "📈 Career growth", value: "growth" },
        { label: "🔁 Career switch", value: "switch" },
        { label: "🚀 Business / startup", value: "startup" },
        { label: "🎓 Higher education", value: "education" },
        { label: "🤔 Exploring options", value: "unsure" },
      ],
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="max-w-md w-full space-y-8 bg-[var(--card)] border border-[var(--border)] p-6 rounded-2xl shadow">
        <BackButton />

        <h1 className="text-2xl font-bold text-center text-[var(--text)]">
          Let’s understand you
        </h1>

        {/* Q1 */}
        {!education && (
          <Section title="Where are you right now?">
            <Option onClick={() => setEducation("school")}>
              🏫 School student
            </Option>
            <Option onClick={() => setEducation("college")}>
              🎓 College student
            </Option>
            <Option onClick={() => setEducation("graduate")}>
              📜 Graduate
            </Option>
            <Option onClick={() => setEducation("working")}>
              💼 Working professional
            </Option>
          </Section>
        )}

        {/* Q2 */}
        {education && !interest && (
          <Section title="What do you enjoy doing?">
            {interestOptions[education].map((opt) => (
              <Option
                key={opt.value}
                onClick={() => setInterest(opt.value)}
              >
                {opt.label}
              </Option>
            ))}
          </Section>
        )}

        {/* Q3 */}
        {education && interest && !clarity && (
          <Section title="How clear do you feel about your next step?">
            <Option onClick={() => setClarity("very-confused")}>
              😕 Very confused
            </Option>
            <Option onClick={() => setClarity("somewhat-clear")}>
              🙂 Somewhat clear
            </Option>
            <Option onClick={() => setClarity("mostly-clear")}>
              😃 Mostly clear
            </Option>
          </Section>
        )}

        {/* SUBMIT */}
        {education && interest && clarity && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white rounded-xl p-3 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "See my guidance"}
          </button>
        )}

        <p className="text-xs text-[var(--muted)] text-center">
          No right or wrong answers. Just choose what feels right.
        </p>
      </div>
    </div>
  );
}

/* ===============================
   SMALL UI COMPONENTS
=============================== */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="font-medium text-[var(--text)]">
        {title}
      </p>
      {children}
    </div>
  );
}

function Option({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left border border-[var(--border)] rounded-xl p-3 hover:bg-[var(--bg)] transition"
    >
      {children}
    </button>
  );
}
