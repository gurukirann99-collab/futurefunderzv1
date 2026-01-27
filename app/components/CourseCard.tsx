import Link from "next/link";
import SkillPill from "./SkillPill";

export default function CourseCard({ course }: { course: any }) {
  return (
    <Link
      href={`/student/courses/${course.id}`}
      className="block border border-[var(--border)] rounded-xl p-4 hover:bg-[var(--bg)] transition"
    >
      <h3 className="font-semibold">{course.title}</h3>

      <p className="text-xs text-[var(--muted)] mt-1">
        Level: {course.level || "Beginner"} · {course.duration || "Self-paced"}
      </p>

      {course.course_skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {course.course_skills.map((cs: any) => (
            <SkillPill
              key={cs.skills.id}
              name={cs.skills.name}
              slug={cs.skills.slug}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
