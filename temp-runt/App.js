import "react-native-gesture-handler";

import { RuntDataProvider } from "./src/context/RuntDataContext";
import AppRoot from "./src/navigation/AppRoot";

export default function App() {
  return (
    <RuntDataProvider>
      <AppRoot />
    </RuntDataProvider>
  );
}
