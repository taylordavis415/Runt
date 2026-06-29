import "react-native-gesture-handler";

import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";

import { RuntDataProvider } from "./src/context/RuntDataContext";
import AppRoot from "./src/navigation/AppRoot";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RuntDataProvider>
      <AppRoot />
    </RuntDataProvider>
  );
}
