import { Text, View } from "react-native";

import { styles } from "../theme/styles";

export default function MiniCard({ label, value, subtext }) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.muted}>{subtext}</Text>
    </View>
  );
}
