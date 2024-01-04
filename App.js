// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";

import { testFunc } from "./utils/backendUsers";
import { useEffect, useState } from "react";
import CustomMapView from "./components/CustomMapView";
import BeHolidaysTest from "./utils/testComponents/BeHolidaysTest";
import BackendTest from "./utils/testComponents/BackendTest";

export default function App() {
  return (
    // <SafeAreaView style={styles.AndroidSafeArea}>
    //   <SafeAreaProvider>
    //     <MainContainer />
    //   </SafeAreaProvider>
    // </SafeAreaView>
    <View style={styles.page}>
      <BeHolidaysTest />
      {/* <CustomMapView /> */}
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
