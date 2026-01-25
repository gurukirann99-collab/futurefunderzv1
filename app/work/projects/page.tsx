"use client";

import Link from "next/link";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import BackButton from "@/app/components/BackButton";

const PROJECTS = [
  {
    id: "portfolio-website",
    title: "Build a Personal Portfolio Website",
    domain: "Web Development",
    difficulty: "Beginner",
    description:
      "Create a simple personal website to showcase your skills and projects.",
  },
  {
    id: "landing-page",
    title: "Design a Marketing Landing Page",
    domain: "Design / Marketing",
    difficulty: "Beginner",
    description:
      "Design a clean landing page for a product or service.",
  },
  {
    id: "content-plan",
    title: "Create a Content Strategy Plan",
    domain: "Marketing / Content",
    difficulty: "Beginner",
    description:
      "Plan a one-month content calendar for a brand.",
  },
  {
    id: "python-script",
    title: "Build a Simple Python Automation Script",
    domain: "Programming",
    difficulty: "Beginner",
    description:
      "Write a small Python script to automate a basic task.",
  },
];

export default function ProjectsPage() {
  const { loading } = useRequireAuth();

  if (loading)
    return (
      <p className="p-8 bg-[var(--bg)] text-[var(--muted)]">
        Loading projects...
      </p>
    );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="p-8 max-w-4xl mx-auto space-y-6 text-[var(--text)]">
        <BackButton />

        <h1 className="text-2xl font-bold">
          Practice Projects
        </h1>

        <p className="text-sm text-[var(--muted)]">
          These projects help you practice skills and build confidence before
          applying for real opportunities.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 space-y-2 hover:shadow"
            >
              <h2 className="font-semibold">
                {project.title}
              </h2>

              <p className="text-xs text-[var(--muted)]">
                {project.domain} • {project.difficulty}
              </p>

              <p className="text-sm text-[var(--muted)]">
                {project.description}
              </p>

              <Link
                href={`/work/projects/${project.id}`}
                className="inline-block text-sm text-[var(--primary)] underline"
              >
                View project →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
