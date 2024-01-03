import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <SafeAreaProvider>
        <MainContainer />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  },
});
