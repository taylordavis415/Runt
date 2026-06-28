import { useMemo } from "react";

import { getWeekProgress } from "../utils/weekProgress";
import useRuntData from "./useRuntData";

export default function useWeekProgress() {
  const { completedWorkouts } = useRuntData();

  return useMemo(() => getWeekProgress(completedWorkouts), [completedWorkouts]);
}
