import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import PlanDayCard from "../components/PlanDayCard";
import { activePlan, weekDays } from "../data/plan";
import useRuntData from "../hooks/useRuntData";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";
import { isWorkoutCompleted } from "../utils/weekProgress";

export default function PlanScreen() {
  const { completedWorkouts, toggleWorkoutComplete } = useRuntData();
  const weekProgress = activePlan.weekNumber / activePlan.totalWeeks;

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={sharedStyles.greeting}>Plan</Text>
        <Text style={sharedStyles.date}>Your training roadmap</Text>
      </View>

      <View style={styles.goalCard}>
        <Text style={sharedStyles.label}>ACTIVE GOAL</Text>
        <Text style={styles.goalTitle}>{activePlan.goal}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>CURRENT PHASE</Text>
            <Text style={styles.metaValue}>{activePlan.phase}</Text>
          </View>
          <View style={styles.metaDivider} />
          <View style={styles.metaBlock}>
            <Text style={styles.metaLabel}>WEEK</Text>
            <Text style={styles.metaValue}>
              {activePlan.weekNumber} of {activePlan.totalWeeks}
            </Text>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${weekProgress * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.sectionLabel}>THIS WEEK</Text>

      {weekDays.map((day) => (
        <PlanDayCard
          key={day.id}
          day={day.day}
          workout={day.workout}
          distance={day.distance}
          nutritionGoal={day.nutritionGoal}
          completed={isWorkoutCompleted(completedWorkouts, day.id)}
          onToggleComplete={() => toggleWorkoutComplete(day.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    marginBottom: 24,
  },
  goalCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
    marginBottom: 28,
  },
  goalTitle: {
    color: colors.cream,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
    marginBottom: 22,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  metaBlock: {
    flex: 1,
  },
  metaDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 6,
  },
  metaValue: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.pink,
    borderRadius: 3,
  },
  sectionLabel: {
    color: colors.pink,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 14,
  },
});
