"use client";

import Link from "next/link";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import BackButton from "@/app/components/BackButton";


const COURSES = [
  {
    id: "web-basics",
    title: "Web Development Basics",
    category: "Technology",
    level: "Beginner",
  },
  {
    id: "python",
    title: "Python for Beginners",
    category: "Technology",
    level: "Beginner",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Foundations",
    category: "Business",
    level: "Beginner",
  },
  {
    id: "business-basics",
    title: "Business & Entrepreneurship Basics",
    category: "Business",
    level: "Beginner",
  },
  {
    id: "ui-ux",
    title: "UI / UX Design Fundamentals",
    category: "Creative",
    level: "Beginner",
  },
  {
    id: "content-writing",
    title: "Content Writing Essentials",
    category: "Creative",
    level: "Beginner",
  },
];

export default function CourseListPage() {
  // 🔒 AUTH GUARD — THIS IS WHERE IT GOES
  const { loading } = useRequireAuth();

  if (loading) {
    return <p className="p-8">Loading courses...</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <BackButton />
      <h1 className="text-2xl font-bold">Courses</h1>
      <p className="text-sm text-gray-600">
        Start with one course. You can always switch later.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="border rounded p-4 space-y-2 hover:shadow-sm"
          >
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-xs text-gray-500">
              {course.category} • {course.level}
            </p>

            <Link
              href={`/learning/course/${course.id}`}
              className="inline-block text-sm text-blue-600 underline"
            >
              Start course →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
