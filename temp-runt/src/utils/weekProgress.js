import { week1 } from "../data/trainingPlan";

const PROGRESS_CATEGORIES = [
  { key: "Run", title: "Runs" },
  { key: "Strength", title: "Strength" },
  { key: "Recovery", title: "Recovery" },
];

function formatPercent(completed, total) {
  if (total === 0) {
    return "0%";
  }

  if (completed === total) {
    return "✓";
  }

  return `${Math.round((completed / total) * 100)}%`;
}

export function getWeekProgress(completedWorkouts = {}) {
  const totals = {
    Run: { completed: 0, total: 0 },
    Strength: { completed: 0, total: 0 },
    Recovery: { completed: 0, total: 0 },
  };

  week1.forEach((day) => {
    const category = totals[day.workoutType];

    if (!category) {
      return;
    }

    category.total += 1;

    if (completedWorkouts[day.id]) {
      category.completed += 1;
    }
  });

  return PROGRESS_CATEGORIES.map(({ key, title }) => {
    const { completed, total } = totals[key];

    return {
      key,
      title,
      completed,
      total,
      subtitle: `${completed} of ${total} completed`,
      percent: formatPercent(completed, total),
    };
  });
}

export function isWorkoutCompleted(completedWorkouts, workoutId) {
  return Boolean(completedWorkouts[workoutId]);
}
