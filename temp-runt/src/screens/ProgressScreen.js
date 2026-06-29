import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProgressRow from "../components/ProgressRow";
import useRuntData from "../hooks/useRuntData";
import useWeekProgress from "../hooks/useWeekProgress";
import { colors } from "../theme/colors";
import { styles as sharedStyles } from "../theme/styles";

export default function ProgressScreen() {
  const weekProgress = useWeekProgress();
const { personalRecords, currentShoe } = useRuntData();

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
    <ProgressRow
      key={item.key}
      title={item.title}
      subtitle={item.subtitle}
      percent={item.percent}
    />
  ))}
</View>

<View style={styles.card}>
  <Text style={sharedStyles.label}>🏆 PERSONAL RECORDS</Text>

  <ProgressItem title="5K" value={personalRecords?.fiveK} />
  <ProgressItem title="10K" value={personalRecords?.tenK} />
  <ProgressItem title="Half Marathon" value={personalRecords?.halfMarathon} />
  <ProgressItem title="Marathon" value={personalRecords?.marathon} />

  <View style={styles.divider} />

  <ProgressItem title="Longest Run" value={personalRecords?.longestRun} />
  <ProgressItem title="Weekly Mileage" value={personalRecords?.weeklyMileage} />
</View>
   
   <View style={styles.card}>
  <Text style={sharedStyles.label}>👟 CURRENT SHOES</Text>

  <ProgressItem
    title="Model"
    value={currentShoe?.name || "--"}
  />

  <Text style={styles.shoeName}>
  {currentShoe?.name || "No shoe selected"}
</Text>

<ShoeProgressBar
  miles={Number(currentShoe?.miles || 0)}
  replaceAt={Number(currentShoe?.replaceAt || 300)}
/>
</View>
   
    </ScrollView>
  );
}
function ProgressItem({ title, value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
      }}
    >
      <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
      <Text style={{ color: "#FF69B4", fontWeight: "700", fontSize: 16 }}>
        {value || "--"}
      </Text>
    </View>
  );
}

function ShoeProgressBar({ miles, replaceAt }) {
  const percent = Math.min(miles / replaceAt, 1);

  return (
    <View style={{ marginTop: 18 }}>
      <View
        style={{
          height: 12,
          backgroundColor: "#263242",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${percent * 100}%`,
            height: "100%",
            backgroundColor: "#FF6FAE",
          }}
        />
      </View>

      <Text
        style={{
          color: "white",
          marginTop: 10,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        {miles} / {replaceAt} miles ({Math.round(percent * 100)}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 48,
    marginBottom: 24,
  },
  divider: {
  height: 1,
  backgroundColor: colors.border,
  marginVertical: 18,
},
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 26,
    padding: 22,
    marginBottom: 20,
  },
  shoeName: {
  color: colors.cream,
  fontSize: 20,
  fontWeight: "700",
  marginTop: 8,
  marginBottom: 12,
},
});
