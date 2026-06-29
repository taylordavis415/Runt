import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { defaultRuntState } from "../services/defaultState";
import { loadRuntState, saveRuntState } from "../services/storage";
import { colors } from "../theme/colors";

export const RuntDataContext = createContext(null);

export function RuntDataProvider({ children }) {
  const [state, setState] = useState(defaultRuntState);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      const savedState = await loadRuntState();

      if (isMounted) {
        setState(savedState);
        setIsReady(true);
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateState = useCallback((updater) => {
    setState((previous) => {
      const nextState = typeof updater === "function" ? updater(previous) : updater;
      saveRuntState(nextState);
      return nextState;
    });
  }, []);

  const toggleWorkoutComplete = useCallback(
    (workoutId) => {
      updateState((previous) => ({
        ...previous,
        completedWorkouts: {
          ...previous.completedWorkouts,
          [workoutId]: !previous.completedWorkouts[workoutId],
        },
      }));
    },
    [updateState],
  );

  const markWorkoutComplete = useCallback(
    (workoutId) => {
      updateState((previous) => ({
        ...previous,
        completedWorkouts: {
          ...previous.completedWorkouts,
          [workoutId]: true,
        },
      }));
    },
    [updateState],
  );

  const setSleepHours = useCallback(
    (sleepHours) => {
      updateState((previous) => ({ ...previous, sleepHours }));
    },
    [updateState],
  );

  const setSoreness = useCallback(
    (soreness) => {
      updateState((previous) => ({ ...previous, soreness }));
    },
    [updateState],
  );

  const setEnergy = useCallback(
    (energy) => {
      updateState((previous) => ({ ...previous, energy }));
    },
    [updateState],
  );

  const setNotes = useCallback(
    (notes) => {
      updateState((previous) => ({ ...previous, notes }));
    },
    [updateState],
  );

  const saveAthleteProfile = useCallback(
    (athleteProfile) => {
      updateState((previous) => ({ ...previous, athleteProfile }));
    },
    [updateState],
  );
const updatePersonalRecord = useCallback(
  (field, value) => {
    updateState((previous) => ({
      ...previous,
      personalRecords: {
        ...previous.personalRecords,
        [field]: value,
      },
    }));
  },
  [updateState],
);

const updateCurrentShoe = useCallback(
  (field, value) => {
    updateState((previous) => ({
      ...previous,
      currentShoe: {
        ...previous.currentShoe,
        [field]: value,
      },
    }));
  },
  [updateState],
); 

  const value = useMemo(
    () => ({
      ...state,
      isReady,
      updateCurrentShoe,
      toggleWorkoutComplete,
      markWorkoutComplete,
      saveAthleteProfile,
      setSleepHours,
      setSoreness,
      updatePersonalRecord,
      setEnergy,
      setNotes,
    }),
    [
      state,
      isReady,
      toggleWorkoutComplete,
      updateCurrentShoe,
      markWorkoutComplete,
      saveAthleteProfile,
      setSleepHours,
      setSoreness,
      setEnergy,
      setNotes,
    ],
  );

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.pink} />
      </View>
    );
  }

  return <RuntDataContext.Provider value={value}>{children}</RuntDataContext.Provider>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
});
