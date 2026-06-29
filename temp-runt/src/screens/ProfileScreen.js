import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import useRuntData from "../hooks/useRuntData";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";

export default function ProfileScreen() {
  const {
    athleteProfile,
    personalRecords,
    saveAthleteProfile,
    updatePersonalRecord,
    sleepHours,
    soreness,
    energy,
    notes,
    currentShoe,
updateCurrentShoe,
    setSleepHours,
    setSoreness,
    setEnergy,
    setNotes,
  } = useRuntData();

  const updateProfileField = (field, value) => {
    saveAthleteProfile({
      ...athleteProfile,
      [field]: value,
    });
  };

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={sharedStyles.greeting}>Profile</Text>
        <Text style={sharedStyles.date}>Daily check-in & preferences</Text>
      </View>

<View style={styles.card}>
        <Text style={sharedStyles.label}>WELLNESS CHECK-IN</Text>
        <Text style={styles.helper}>Saved automatically to your device.</Text>

        <Field label="SLEEP HOURS" placeholder="e.g. 8.5" value={sleepHours} onChangeText={setSleepHours} />
        <Field label="SORENESS" placeholder="e.g. Low, 3/10" value={soreness} onChangeText={setSoreness} />
        <Field label="ENERGY" placeholder="e.g. High, 8/10" value={energy} onChangeText={setEnergy} />

        <Text style={styles.fieldLabel}>NOTES</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="How are you feeling today?"
          placeholderTextColor={colors.muted}
          value={notes}
          onChangeText={setNotes}
          multiline
          textAlignVertical="top"
        />
      </View>

      <View style={styles.card}>
        <Text style={sharedStyles.label}>ATHLETE PROFILE</Text>
        <Text style={styles.helper}>Edit your race and training preferences.</Text>

        <Field label="NAME" placeholder="Taylor" value={athleteProfile?.name || ""} onChangeText={(text) => updateProfileField("name", text)} />
        <Field label="RACE NAME" placeholder="City to Sea Half Marathon" value={athleteProfile?.raceName || ""} onChangeText={(text) => updateProfileField("raceName", text)} />
        <Field label="RACE DATE" placeholder="10/18/2026" value={athleteProfile?.raceDate || ""} onChangeText={(text) => updateProfileField("raceDate", text)} />
        <Field label="GOAL TIME" placeholder="Finish strong" value={athleteProfile?.goalTime || ""} onChangeText={(text) => updateProfileField("goalTime", text)} />
        <Field label="RUNS PER WEEK" placeholder="4" value={athleteProfile?.runsPerWeek || ""} onChangeText={(text) => updateProfileField("runsPerWeek", text)} />
        <Field label="LONG RUN DAY" placeholder="Saturday" value={athleteProfile?.longRunDay || ""} onChangeText={(text) => updateProfileField("longRunDay", text)} />
      </View>

      <View style={styles.card}>
        <Text style={sharedStyles.label}>🏆 PERSONAL RECORDS</Text>
        <Text style={styles.helper}>These will eventually sync with Apple Health.</Text>

        <Field label="5K" value={personalRecords?.fiveK || ""} placeholder="24:31" onChangeText={(text) => updatePersonalRecord("fiveK", text)} />
        <Field label="10K" value={personalRecords?.tenK || ""} placeholder="52:14" onChangeText={(text) => updatePersonalRecord("tenK", text)} />
        <Field label="HALF MARATHON" value={personalRecords?.halfMarathon || ""} placeholder="1:57:42" onChangeText={(text) => updatePersonalRecord("halfMarathon", text)} />
        <Field label="MARATHON" value={personalRecords?.marathon || ""} placeholder="3:58:00" onChangeText={(text) => updatePersonalRecord("marathon", text)} />
        <Field label="LONGEST RUN" value={personalRecords?.longestRun || ""} placeholder="13.2 mi" onChangeText={(text) => updatePersonalRecord("longestRun", text)} />
        <Field label="WEEKLY MILEAGE" value={personalRecords?.weeklyMileage || ""} placeholder="28.4" onChangeText={(text) => updatePersonalRecord("weeklyMileage", text)} />
      </View>

<View style={styles.card}>
  <Text style={sharedStyles.label}>👟 CURRENT SHOES</Text>

  <Text style={styles.helper}>
    Track mileage so you know when it's time to replace your shoes.
  </Text>

  <Field
    label="SHOE NAME"
    placeholder="Nike Vaporfly 3"
    value={currentShoe?.name || ""}
    onChangeText={(text) => updateCurrentShoe("name", text)}
  />

  <Field
    label="CURRENT MILES"
    placeholder="184.6"
    value={currentShoe?.miles || ""}
    onChangeText={(text) => updateCurrentShoe("miles", text)}
  />

  <Field
    label="REPLACE AT"
    placeholder="300"
    value={currentShoe?.replaceAt || ""}
    onChangeText={(text) => updateCurrentShoe("replaceAt", text)}
  />
</View>
      
    </ScrollView>
  );
}

function Field({ label, placeholder, value, onChangeText }) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
  helper: {
    color: colors.muted,
    fontSize: 14,
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
  notesInput: {
    minHeight: 120,
    paddingTop: 14,
  },
});