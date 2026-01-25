"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";

const PROJECT_MAP: Record<
  string,
  {
    title: string;
    description: string;
    steps: string[];
    skills: string[];
  }
> = {
  "portfolio-website": {
    title: "Build a Personal Portfolio Website",
    description:
      "Create a simple personal website to showcase your skills, projects, and contact information.",
    steps: [
      "Decide what sections to include (About, Skills, Projects, Contact)",
      "Create basic HTML structure",
      "Style the site using CSS",
      "Add simple interactivity (optional)",
      "Deploy or share screenshots",
    ],
    skills: ["HTML", "CSS", "Basic design thinking"],
  },
  "landing-page": {
    title: "Design a Marketing Landing Page",
    description:
      "Design a clean landing page that communicates value clearly and converts visitors.",
    steps: [
      "Choose a product or service",
      "Write a clear headline and description",
      "Design layout wireframe",
      "Create visual design",
      "Explain how users should take action",
    ],
    skills: ["UI design", "Copywriting", "Marketing basics"],
  },
  "python-script": {
    title: "Build a Simple Python Automation Script",
    description:
      "Write a small Python script to automate a repetitive task.",
    steps: [
      "Identify a simple task to automate",
      "Write basic Python logic",
      "Handle inputs and outputs",
      "Test the script",
      "Improve readability",
    ],
    skills: ["Python", "Problem solving"],
  },
};

export default function ProjectDetailPage() {
  // 🔒 AUTH GUARD (REQUIRED)
  const { loading } = useRequireAuth();

  const params = useParams();
  const projectId = params.id as string;

  if (loading) {
    return <p className="p-8">Loading project...</p>;
  }

  const project = PROJECT_MAP[projectId];

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Project not found.</p>
        <Link href="/work/projects" className="text-blue-600 underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>

      <p className="text-gray-700">{project.description}</p>

      <div>
        <h2 className="font-semibold mb-2">Steps to complete</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
          {project.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Skills you’ll practice</h2>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          {project.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        {/* ✅ REAL NEXT STEP */}
        <Link
          href={`/learning/progress?project=${projectId}`}
          className="block text-center bg-green-600 text-white rounded p-3 hover:bg-green-700"
        >
          I’ll start working on this →
        </Link>

        <Link
          href="/learning/courses"
          className="block text-center text-sm text-gray-500 underline"
        >
          Go back to learning
        </Link>
      </div>
    </div>
  );
}
