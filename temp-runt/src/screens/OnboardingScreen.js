import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import useRuntData from "../hooks/useRuntData";
import { createAthleteProfile } from "../services/athleteProfile";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";

const LONG_RUN_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const INITIAL_FORM = {
  name: "",
  raceName: "",
  raceDate: "",
  goalTime: "",
  runsPerWeek: "",
  longRunDay: "",
  strengthDaysPerWeek: "",
  currentLongestRun: "",
};

export default function OnboardingScreen() {
  const { saveAthleteProfile } = useRuntData();
  const [form, setForm] = useState(INITIAL_FORM);
  const [hasAppleWatch, setHasAppleWatch] = useState(null);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      setError("Please enter your name to continue.");
      return;
    }

    if (hasAppleWatch === null) {
      setError("Please select whether you use an Apple Watch.");
      return;
    }

    saveAthleteProfile(
      createAthleteProfile({
        ...form,
        hasAppleWatch,
      }),
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={sharedStyles.screen} contentContainerStyle={styles.content}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <Text style={sharedStyles.greeting}>Welcome to Runt</Text>
          <Text style={sharedStyles.date}>Tell us about your race and training.</Text>
        </View>

        <View style={styles.card}>
          <Text style={sharedStyles.label}>ATHLETE PROFILE</Text>

          <OnboardingField
            label="NAME"
            placeholder="Taylor"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
          />
          <OnboardingField
            label="RACE NAME"
            placeholder="City to Sea Half Marathon"
            value={form.raceName}
            onChangeText={(value) => updateField("raceName", value)}
          />
          <OnboardingField
            label="RACE DATE"
            placeholder="MM/DD/YYYY"
            value={form.raceDate}
            onChangeText={(value) => updateField("raceDate", value)}
          />
          <OnboardingField
            label="GOAL TIME"
            placeholder="2:05:00"
            value={form.goalTime}
            onChangeText={(value) => updateField("goalTime", value)}
          />
          <OnboardingField
            label="RUNS PER WEEK"
            placeholder="4"
            value={form.runsPerWeek}
            onChangeText={(value) => updateField("runsPerWeek", value)}
            keyboardType="numeric"
          />
          <OnboardingField
            label="STRENGTH DAYS PER WEEK"
            placeholder="2"
            value={form.strengthDaysPerWeek}
            onChangeText={(value) => updateField("strengthDaysPerWeek", value)}
            keyboardType="numeric"
          />
          <OnboardingField
            label="CURRENT LONGEST RUN"
            placeholder="6 miles"
            value={form.currentLongestRun}
            onChangeText={(value) => updateField("currentLongestRun", value)}
          />

          <Text style={styles.fieldLabel}>LONG RUN DAY</Text>
          <View style={styles.dayRow}>
            {LONG_RUN_DAYS.map((day) => {
              const selected = form.longRunDay === day;

              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayChip, selected && styles.dayChipSelected]}
                  onPress={() => updateField("longRunDay", day)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayChipText, selected && styles.dayChipTextSelected]}>
                    {day.slice(0, 3)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.fieldLabel}>APPLE WATCH</Text>
          <View style={styles.toggleRow}>
            <ToggleButton
              label="Yes"
              selected={hasAppleWatch === true}
              onPress={() => setHasAppleWatch(true)}
            />
            <ToggleButton
              label="No"
              selected={hasAppleWatch === false}
              onPress={() => setHasAppleWatch(false)}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={sharedStyles.primaryButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={sharedStyles.primaryButtonText}>START TRAINING</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function OnboardingField({ label, placeholder, value, onChangeText, keyboardType = "default" }) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  );
}

function ToggleButton({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, selected && styles.toggleButtonSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.toggleButtonText, selected && styles.toggleButtonTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navy,
  },
  content: {
    padding: 22,
    paddingBottom: 48,
  },
  header: {
    marginTop: 48,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 26,
    padding: 22,
    marginBottom: 20,
  },
  fieldLabel: {
    color: colors.pink,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.navy,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    color: colors.cream,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  dayRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  dayChip: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.navy,
  },
  dayChipSelected: {
    borderColor: colors.pink,
    backgroundColor: colors.pink,
  },
  dayChipText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
  },
  dayChipTextSelected: {
    color: colors.navy,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.navy,
  },
  toggleButtonSelected: {
    borderColor: colors.pink,
    backgroundColor: colors.pink,
  },
  toggleButtonText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
  },
  toggleButtonTextSelected: {
    color: colors.navy,
  },
  error: {
    color: colors.pink,
    fontSize: 14,
    marginBottom: 12,
  },
});
