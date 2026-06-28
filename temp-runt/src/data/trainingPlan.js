export const week1 = [
  {
    id: "monday",
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
    id: "tuesday",
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
    id: "wednesday",
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
    id: "thursday",
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
    id: "friday",
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
    id: "saturday",
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
    id: "sunday",
    dayName: "Sunday",
    workoutTitle: "Recovery Walk + Meal Prep",
    workoutType: "Recovery",
    distance: "Optional 2 miles",
    estimatedTime: "30 min",
    purpose: "Promote blood flow and prepare for next week.",
    nutritionGoal: "Meal prep breakfasts/lunches.",
    mobilityGoal: "Long gentle mobility session.",
  },
];

const WEEKDAY_IDS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function getTodaysWorkout() {
  const todayId = WEEKDAY_IDS[new Date().getDay()];
  return week1.find((day) => day.id === todayId) ?? week1[0];
}

export function formatTodayDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function isRunDay(workout) {
  return workout.workoutType === "Run";
}

const COACH_NOTES = {
  Run: "Keep the first mile easy. You should finish feeling like you could do one more mile.",
  Strength: "Move with control and stop each set before form breaks down.",
  Recovery: "Keep effort low today. Recovery is training — don't rush through it.",
};

export function getCoachNote(workoutType) {
  return COACH_NOTES[workoutType] ?? "Trust the plan and listen to your body today.";
}
