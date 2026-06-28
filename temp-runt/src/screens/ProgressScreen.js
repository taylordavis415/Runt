import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import ProgressRow from "../components/ProgressRow";
import useWeekProgress from "../hooks/useWeekProgress";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";

export default function ProgressScreen() {
  const weekProgress = useWeekProgress();

  return (
    <ScrollView style={sharedStyles.screen} contentContainerStyle={sharedStyles.content}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={sharedStyles.greeting}>Progress</Text>
        <Text style={sharedStyles.date}>Week 1 training totals</Text>
      </View>

      <View style={styles.card}>
        <Text style={sharedStyles.label}>WEEK PROGRESS</Text>
        {weekProgress.map((item) => (
          <ProgressRow key={item.key} title={item.title} subtitle={item.subtitle} percent={item.percent} />
        ))}
      </View>
    </ScrollView>
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
});
