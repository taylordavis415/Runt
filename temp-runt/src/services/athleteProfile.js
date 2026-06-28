export function hasAthleteProfile(profile) {
  return Boolean(profile?.name?.trim());
}

export function createAthleteProfile(fields) {
  return {
    name: fields.name.trim(),
    raceName: fields.raceName.trim(),
    raceDate: fields.raceDate.trim(),
    goalTime: fields.goalTime.trim(),
    runsPerWeek: fields.runsPerWeek.trim(),
    longRunDay: fields.longRunDay.trim(),
    strengthDaysPerWeek: fields.strengthDaysPerWeek.trim(),
    currentLongestRun: fields.currentLongestRun.trim(),
    hasAppleWatch: fields.hasAppleWatch,
  };
}
