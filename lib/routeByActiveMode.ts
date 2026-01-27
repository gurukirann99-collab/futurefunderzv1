import { ROLE_ACTIVE_MODES } from "./modeConfig";

export function routeByActiveMode(
  role: string,
  activeMode?: string | null
) {
  const allowedModes = ROLE_ACTIVE_MODES[role] || ["dashboard"];

  // invalid or missing mode → fallback
  if (!activeMode || !allowedModes.includes(activeMode as any)) {
    return defaultRouteByRole(role);
  }

  switch (activeMode) {
    case "explore":
      return "/guidance/explore";
    case "career":
      return "/career";
    case "learning":
      return "/student/learning";
    case "work":
      return "/student/work";
    case "admissions":
      return "/student/admissions";
    default:
      return defaultRouteByRole(role);
  }
}

function defaultRouteByRole(role: string) {
  switch (role) {
    case "partner":
      return "/partner/dashboard";
    case "admin":
      return "/admin";
    default:
      return "/dashboard";
  }
}
