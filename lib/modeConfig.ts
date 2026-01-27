export const ROLE_MODES: Record<string, string[]> = {
  student: ["learner"],
  mentor: ["mentor", "learner"],
  partner: ["partner"],
  parent: ["parent"],
  admin: ["admin", "learner", "partner"],
};
