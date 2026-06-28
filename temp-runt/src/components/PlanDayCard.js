import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "../theme/colors";

export default function PlanDayCard({
  day,
  workout,
  distance,
  nutritionGoal,
  completed = false,
  onToggleComplete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.workout}>{workout}</Text>
        {distance ? <Text style={styles.distance}>{distance}</Text> : null}
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>NUTRITION</Text>
          <Text style={styles.nutritionGoal}>{nutritionGoal}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.completionCircle, completed && styles.completionCircleDone]}
        onPress={onToggleComplete}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Mark ${day} workout as ${completed ? "incomplete" : "complete"}`}
      >
        {completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    paddingRight: 14,
  },
  day: {
    color: colors.pink,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  workout: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 4,
  },
  distance: {
    color: colors.pink,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 10,
  },
  nutritionRow: {
    marginTop: 4,
  },
  nutritionLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  nutritionGoal: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  completionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  completionCircleDone: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  checkmark: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
  },
});
