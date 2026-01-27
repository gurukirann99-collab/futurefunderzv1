export function scoreCollege(profile: any, college: any) {
  let score = 0;

  // Budget match
  if (
    profile.budget_min &&
    profile.budget_max &&
    college.fees >= profile.budget_min &&
    college.fees <= profile.budget_max
  ) {
    score += 30;
  }

  // Outcome vs cost
  if (college.avg_package && college.fees) {
    const ratio = college.avg_package / college.fees;
    if (ratio >= 1) score += 25;
    else score += 10;
  }

  // Location match
  if (
    profile.location_preference &&
    college.city
      .toLowerCase()
      .includes(profile.location_preference.toLowerCase())
  ) {
    score += 20;
  }

  // Affordability
  if (college.fees && college.fees < 100000) {
    score += 15;
  }

  // Base score
  score += 10;

  return score;
}
