export const ROLE_CAPABILITIES: Record<string, string[]> = {
  student: ["learner"],
  mentor: ["mentor", "learner"],
  partner: ["partner"],
  parent: ["parent"],
  admin: ["admin", "learner", "partner"],
};

export const ACTIVE_MODES = [
  "explore",
  "career",
  "learning",
  "work",
  "admissions",
  "dashboard",
] as const;

export type ActiveMode = typeof ACTIVE_MODES[number];

export const ROLE_ACTIVE_MODES: Record<string, ActiveMode[]> = {
  student: ["explore", "career", "learning", "work", "admissions", "dashboard"],
  parent: ["explore", "admissions", "dashboard"],
  partner: ["dashboard"],
  mentor: ["learning", "dashboard"],
  admin: ["dashboard"],
};
