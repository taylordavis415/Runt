import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import useRuntData from "../hooks/useRuntData";
import CoachScreen from "../screens/CoachScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PlanScreen from "../screens/PlanScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProgressScreen from "../screens/ProgressScreen";
import { hasAthleteProfile } from "../services/athleteProfile";
import { colors } from "../theme/colors";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
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
  );
}

export default function AppRoot() {
  const { athleteProfile } = useRuntData();

  if (!hasAthleteProfile(athleteProfile)) {
    return <OnboardingScreen />;
  }

  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
