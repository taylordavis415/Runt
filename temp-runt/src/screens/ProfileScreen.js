import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import useRuntData from "../hooks/useRuntData";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";

export default function ProfileScreen() {
  const { sleepHours, soreness, energy, notes, setSleepHours, setSoreness, setEnergy, setNotes } =
    useRuntData();

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
