// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";

import { testFunc } from "./utils/backend";
import BackendTest from "./utils/BackendTest";
import { useEffect, useState } from "react";
import CustomMapView from "./components/CustomMapView";

export default function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    testFunc().then((res) => {
      setTest(res);
    });
  }, []);

  return (
    // <SafeAreaView style={styles.AndroidSafeArea}>
    //   <SafeAreaProvider>
    //     <MainContainer />
    //   </SafeAreaProvider>
    // </SafeAreaView>
    <View style={styles.page}>
      {/* <BackendTest /> */}
      <CustomMapView />
    </View>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
