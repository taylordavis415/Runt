import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MiniCard from "../components/MiniCard";
import ProgressRow from "../components/ProgressRow";
import { formatTodayDate, getTodaysWorkout, isRunDay } from "../data/trainingPlan";
import useRuntData from "../hooks/useRuntData";
import useWeekProgress from "../hooks/useWeekProgress";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles";
import { isWorkoutCompleted } from "../utils/weekProgress";

export default function HomeScreen({ navigation }) {
  const { athleteProfile, sleepHours, soreness, energy, completedWorkouts } = useRuntData();
  const weekProgress = useWeekProgress();
  const today = getTodaysWorkout();
  const runDay = isRunDay(today);
  const isCompleted = isWorkoutCompleted(completedWorkouts, today.id);

  const athleteName = athleteProfile?.name?.trim() || "Athlete";
  const raceName = athleteProfile?.raceName?.trim();
  const raceDate = athleteProfile?.raceDate;

let daysRemaining = null;

if (raceDate) {
  let race;

  if (raceDate.includes("/")) {
    const parts = raceDate.split("/");
    const month = Number(parts[0]);
    const day = Number(parts[1]);
    let year = Number(parts[2]);

    if (year < 100) {
      year = 2000 + year;
    }

    race = new Date(year, month - 1, day);
  } else {
    race = new Date(raceDate);
  }

  const todayDate = new Date();

  todayDate.setHours(0, 0, 0, 0);
  race.setHours(0, 0, 0, 0);

  if (!Number.isNaN(race.getTime())) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    daysRemaining = Math.ceil((race.getTime() - todayDate.getTime()) / millisecondsPerDay);
  }
}
let currentWeek = 1;
const totalWeeks = 16;

if (daysRemaining !== null) {
  const weeksUntilRace = Math.ceil(daysRemaining / 7);
  currentWeek = totalWeeks - weeksUntilRace + 1;

  if (currentWeek < 1) currentWeek = 1;
  if (currentWeek > totalWeeks) currentWeek = totalWeeks;
}
  const sleepDisplay = sleepHours.trim() ? `${sleepHours}h` : "8h 14m";
  const sorenessDisplay = soreness.trim() ? soreness : "82%";
  const energyDisplay = energy.trim() ? energy : "High";

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <View style={styles.header}>
  <View>
    <Text style={styles.greeting}>
      Good Morning, {athleteName} 👋
    </Text>

    <Text style={styles.date}>{formatTodayDate()}</Text>

    {raceName ? (
  <View>
    <Text style={homeStyles.raceName}>Race: {raceName}</Text>

    {daysRemaining !== null ? (
      <View>
        <Text style={homeStyles.countdown}>
          {daysRemaining} days remaining
        </Text>

        <Text style={homeStyles.weekCount}>
          Week {currentWeek} of {totalWeeks}
        </Text>
      </View>
    ) : null}
  </View>
) : null}
  </View>


  <Text style={styles.bell}>🔔</Text>
</View>

      <View style={styles.heroCard}>
        <View style={homeStyles.missionHeader}>
          <Text style={styles.label}>TODAY'S MISSION</Text>
          {isCompleted ? (
            <View style={homeStyles.completedBadge}>
              <Text style={homeStyles.completedBadgeText}>Completed</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.workoutTitle}>{today.workoutTitle}</Text>

        {runDay && today.distance ? (
          <Text style={styles.distance}>{today.distance}</Text>
        ) : (
          <Text style={styles.distance}>{today.estimatedTime}</Text>
        )}

        <Text style={styles.infoText}>
          {runDay ? `Estimated time: ${today.estimatedTime}` : today.workoutType}
        </Text>
        <Text style={styles.infoText}>{today.purpose}</Text>
        <Text style={styles.infoText}>Nutrition: {today.nutritionGoal}</Text>
        <Text style={styles.infoText}>Mobility: {today.mobilityGoal}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("WorkoutDetail")}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {runDay ? "START ON APPLE WATCH" : "START WORKOUT"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.threeColumn}>
        <MiniCard label="RECOVERY" value={sorenessDisplay} subtext="Good to go" />
        <MiniCard label="SLEEP" value={sleepDisplay} subtext="Quality good" />
        <MiniCard label="READINESS" value={energyDisplay} subtext="Let's do this" />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>WEEK PROGRESS</Text>
        {weekProgress.map((item) => (
          <ProgressRow key={item.key} title={item.title} subtitle={item.subtitle} percent={item.percent} />
        ))}
      </View>
    </ScrollView>
  );
}

const homeStyles = StyleSheet.create({
  missionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  completedBadge: {
    backgroundColor: colors.green,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  completedBadgeText: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  raceName: {
    color: colors.pink,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8,
  },
  countdown: {
  color: "#FFFFFF",
  fontSize: 14,
  marginTop: 4,
  opacity: 0.8,
},
weekCount: {
  color: colors.pink,
  fontSize: 14,
  fontWeight: "800",
  marginTop: 4,
},
});
