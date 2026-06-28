import { Text, View } from "react-native";

import { styles } from "../theme/styles";

export default function ProgressRow({ title, subtitle, percent }) {
  return (
    <View style={styles.progressRow}>
      <View>
        <Text style={styles.progressTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
      </View>
      <Text style={styles.progressPercent}>{percent}</Text>
    </View>
  );
}
