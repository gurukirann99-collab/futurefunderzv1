"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Assessment = {
  career_clarity: string;
  skill_level: string;
};

type Journey = {
  stage: string;
  created_at: string;
};

export default function ParentDiscoveryPage() {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDiscovery = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) return;

      /* ---------------------------------
         NOTE (V1):
         We assume 1 child per parent
         Linking comes in V2
      --------------------------------- */

      const { data: assessmentData } = await supabase
        .from("student_assessments")
        .select("career_clarity, skill_level")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const { data: journeyData } = await supabase
        .from("student_journey_history")
        .select("stage, created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      setAssessment(assessmentData || null);
      setJourney(journeyData || null);
      setLoading(false);
    };

    loadDiscovery();
  }, []);

  if (loading) {
    return (
      <p className="p-6 text-[var(--muted)]">
        Loading discovery summary...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 text-[var(--text)]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Career Discovery Summary
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          A simple overview of your child’s current thinking and interests.
        </p>
      </div>

      {/* If no data */}
      {!assessment && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <p className="text-[var(--muted)]">
            Your child has not completed career discovery yet.
          </p>
        </div>
      )}

      {assessment && (
        <>
          {/* Stage */}
          <Section
            title="Current Stage"
            description={stageText(journey?.stage)}
          />

          {/* Interests */}
          <Section
            title="Interest Area"
            description={interestText(assessment.skill_level)}
          />

          {/* Confidence */}
          <Section
            title="Confidence Level"
            description={clarityText(assessment.career_clarity)}
          />

          {/* What this means */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">
              What this means for parents
            </h3>
            <p className="text-sm text-[var(--muted)]">
              At this stage, your child is exploring interests and building
              awareness. No career decisions are being made yet.
            </p>
            <p className="text-sm text-[var(--muted)]">
              The next steps will focus on learning, exposure, and skill
              discovery — not pressure or commitments.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/* ===============================
   HELPER UI
=============================== */

function Section({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-[var(--muted)] mt-2">
        {description}
      </p>
    </div>
  );
}

/* ===============================
   FRIENDLY TEXT MAPPERS
=============================== */

function stageText(stage?: string) {
  switch (stage) {
    case "exploration":
      return "Your child is currently exploring different interests. This is very common and healthy at this age.";
    case "focus":
      return "Your child is beginning to focus on certain areas of interest.";
    case "execution":
      return "Your child feels relatively confident about next steps.";
    default:
      return "Discovery stage information is not yet available.";
  }
}

function interestText(interest?: string) {
  switch (interest) {
    case "logic":
      return "Enjoys problem-solving, puzzles, and logical thinking.";
    case "science":
      return "Shows interest in science, experiments, and understanding how things work.";
    case "creative":
      return "Enjoys creative activities like drawing, design, or media.";
    case "technology":
      return "Interested in computers, technology, or digital tools.";
    case "communication":
      return "Enjoys speaking, explaining ideas, and interacting with others.";
    case "business":
      return "Interested in business, leadership, or management concepts.";
    case "unsure":
      return "Still exploring interests — this is completely normal.";
    default:
      return "Interest information is still being explored.";
  }
}

function clarityText(clarity?: string) {
  switch (clarity) {
    case "exploration":
    case "very-confused":
      return "Feels unsure about next steps. This is normal and expected at this stage.";
    case "focus":
    case "somewhat-clear":
      return "Has some idea about interests but is still exploring options.";
    case "execution":
    case "mostly-clear":
      return "Feels reasonably confident but is still open to learning and growth.";
    default:
      return "Confidence level is still being understood.";
  }
}
