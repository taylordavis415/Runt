import AsyncStorage from "@react-native-async-storage/async-storage";

import { defaultRuntState } from "./defaultState";
import { STORAGE_KEY } from "./storageKeys";

export async function loadRuntState() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultRuntState,
        ...parsed,
        athleteProfile: parsed.athleteProfile ?? null,
        completedWorkouts: {
          ...defaultRuntState.completedWorkouts,
          ...(parsed.completedWorkouts ?? {}),
        },
      };
    }
  } catch (error) {
    console.warn("Runt: failed to load saved data", error);
  }

  return { ...defaultRuntState };
}

export async function saveRuntState(state) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Runt: failed to save data", error);
  }
}

export async function clearRuntState() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Runt: failed to clear saved data", error);
  }
}
