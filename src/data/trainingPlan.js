export const activePlan = {
  id: "city-to-sea-half-2026",
  raceName: "City to Sea Half Marathon",
  raceDistance: "Half Marathon",
  totalWeeks: 16,
  currentWeek: 1,
  phase: "Foundation",
  longRunDay: "Saturday",
  week: [
    {
      dayName: "Monday",
      workoutTitle: "Lower Body + Core",
      workoutType: "Strength",
      distance: null,
      estimatedTime: "45 min",
      purpose: "Build strength for running durability.",
      nutritionGoal: "Protein at each meal.",
      mobilityGoal: "Hips, calves, hamstrings.",
    },
    {
      dayName: "Tuesday",
      workoutTitle: "Easy Run",
      workoutType: "Run",
      distance: "2.5 miles",
      estimatedTime: "32 min",
      purpose: "Build aerobic endurance.",
      nutritionGoal: "Carbs before, protein after.",
      mobilityGoal: "Calves and hips.",
    },
    {
      dayName: "Wednesday",
      workoutTitle: "Upper Body + Core",
      workoutType: "Strength",
      distance: null,
      estimatedTime: "40 min",
      purpose: "Build posture, core control, and upper body strength.",
      nutritionGoal: "Hydrate well.",
      mobilityGoal: "Thoracic spine and shoulders.",
    },
    {
      dayName: "Thursday",
      workoutTitle: "Easy Run + Pickups",
      workoutType: "Run",
      distance: "2.5 miles",
      estimatedTime: "35 min",
      purpose: "Practice light speed without overdoing it.",
      nutritionGoal: "Small carb snack before.",
      mobilityGoal: "Hip flexors and calves.",
    },
    {
      dayName: "Friday",
      workoutTitle: "Recovery + Mobility",
      workoutType: "Recovery",
      distance: null,
      estimatedTime: "20 min",
      purpose: "Absorb training and reduce soreness.",
      nutritionGoal: "Hydrate and prep for long run.",
      mobilityGoal: "Gentle full-body yoga.",
    },
    {
      dayName: "Saturday",
      workoutTitle: "Long Run",
      workoutType: "Run",
      distance: "3.5 miles",
      estimatedTime: "45 min",
      purpose: "Build endurance and confidence.",
      nutritionGoal: "Breakfast before, recovery meal after.",
      mobilityGoal: "Post-run lower body stretch.",
    },
    {
      dayName: "Sunday",
      workoutTitle: "Recovery Walk + Meal Prep",
      workoutType: "Recovery",
      distance: "Optional 2 miles",
      estimatedTime: "30 min",
      purpose: "Promote blood flow and prepare for next week.",
      nutritionGoal: "Meal prep breakfasts/lunches.",
      mobilityGoal: "Long gentle mobility session.",
    },
  ],
};

export function getTodayMission() {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    activePlan.week.find((day) => day.dayName === dayName) ||
    activePlan.week[0]
  );
}