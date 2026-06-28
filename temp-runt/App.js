import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { RuntDataProvider } from "./src/context/RuntDataContext";
import HomeNavigator from "./src/navigation/HomeNavigator";
import CoachScreen from "./src/screens/CoachScreen";
import PlanScreen from "./src/screens/PlanScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import { colors } from "./src/theme/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RuntDataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              height: 86,
              paddingBottom: 24,
              paddingTop: 10,
            },
            tabBarActiveTintColor: colors.pink,
            tabBarInactiveTintColor: colors.muted,
          }}
        >
          <Tab.Screen name="Home" component={HomeNavigator} />
          <Tab.Screen name="Plan" component={PlanScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Coach" component={CoachScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </RuntDataProvider>
  );
}
