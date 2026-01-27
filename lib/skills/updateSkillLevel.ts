export function calculateSkillLevel(courseCount: number) {
  if (courseCount >= 3) return "advanced";
  if (courseCount >= 2) return "intermediate";
  return "beginner";
}
