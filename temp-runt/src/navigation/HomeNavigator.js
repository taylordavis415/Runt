import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
    </Stack.Navigator>
  );
}
