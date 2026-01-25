"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const COURSE_MAP: Record<
  string,
  { title: string; description: string; lessons: string[] }
> = {
  "web-basics": {
    title: "Web Development Basics",
    description:
      "Learn how websites work and build a strong foundation in web technologies.",
    lessons: [
      "How the web works",
      "HTML basics",
      "CSS basics",
      "Intro to JavaScript",
    ],
  },
  python: {
    title: "Python for Beginners",
    description:
      "Start coding with Python and understand programming fundamentals.",
    lessons: [
      "What is Python?",
      "Variables and data types",
      "Control flow",
      "Basic functions",
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing Foundations",
    description:
      "Understand how online marketing works and how businesses grow digitally.",
    lessons: [
      "Marketing basics",
      "SEO overview",
      "Social media marketing",
      "Content strategy",
    ],
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;

  const course = COURSE_MAP[courseId];

  if (!course) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Course not found.</p>
        <Link href="/learning/courses" className="text-blue-600 underline">
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>

      <p className="text-gray-700">{course.description}</p>

      <div>
        <h2 className="font-semibold mb-2">What you’ll learn</h2>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          {course.lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <Link
          href="/learning/progress"
          className="block text-center bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
        >
          Start learning
        </Link>

        <Link
          href="/learning/courses"
          className="block text-center text-sm text-gray-500 underline"
        >
          Choose a different course
        </Link>
      </div>
    </div>
  );
}
