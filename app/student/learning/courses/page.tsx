import { getCourses } from "@/lib/courses";
import CourseCard from "@/app/components/CourseCard";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>

      <p className="text-sm text-[var(--muted)]">
        Learn skills that directly connect to careers and jobs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course: any) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
