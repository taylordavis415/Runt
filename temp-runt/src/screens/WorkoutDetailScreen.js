import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { getCoachNote, getTodaysWorkout, isRunDay } from "../data/trainingPlan";
import useRuntData from "../hooks/useRuntData";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";
import { isWorkoutCompleted } from "../utils/weekProgress";

export default function WorkoutDetailScreen({ navigation }) {
  const { completedWorkouts, markWorkoutComplete } = useRuntData();
  const today = getTodaysWorkout();
  const runDay = isRunDay(today);
  const isCompleted = isWorkoutCompleted(completedWorkouts, today.id);

  function handleComplete() {
    markWorkoutComplete(today.id);
    navigation.goBack();
  }

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
      <StatusBar style="light" />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={sharedStyles.greeting}>{today.workoutTitle}</Text>
        <Text style={sharedStyles.date}>{today.dayName} · {today.workoutType}</Text>
      </View>

      <View style={styles.heroCard}>
        {runDay && today.distance ? (
          <Text style={sharedStyles.distance}>{today.distance}</Text>
        ) : null}
        <Text style={styles.detailLine}>Estimated time: {today.estimatedTime}</Text>
      </View>

      <DetailCard label="PURPOSE" text={today.purpose} />
      <DetailCard label="NUTRITION" text={today.nutritionGoal} />
      <DetailCard label="MOBILITY" text={today.mobilityGoal} />
      <DetailCard label="COACH NOTE" text={getCoachNote(today.workoutType)} accent />

      <TouchableOpacity
        style={[sharedStyles.primaryButton, isCompleted && styles.completeButtonDone]}
        onPress={handleComplete}
        activeOpacity={0.8}
        disabled={isCompleted}
      >
        <Text style={sharedStyles.primaryButtonText}>
          {isCompleted ? "WORKOUT COMPLETED" : "COMPLETE WORKOUT"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailCard({ label, text, accent = false }) {
  return (
    <View style={styles.card}>
      <Text style={sharedStyles.label}>{label}</Text>
      <Text style={[styles.cardText, accent && styles.coachText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 48,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  backText: {
    color: colors.pink,
    fontSize: 16,
    fontWeight: "800",
  },
  header: {
    marginBottom: 24,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
    marginBottom: 16,
  },
  detailLine: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 20,
    marginBottom: 12,
  },
  cardText: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  coachText: {
    color: colors.cream,
    fontSize: 17,
    lineHeight: 26,
  },
  completeButtonDone: {
    opacity: 0.6,
  },
});
