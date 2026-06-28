import { Text, View } from "react-native";

import { styles } from "../theme/styles";

export default function BasicScreen({ title, text }) {
  return (
    <View style={styles.basicScreen}>
      <Text style={styles.greeting}>{title}</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{text}</Text>
      </View>
    </View>
  );
}
