import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";

import { testFunc } from "./utils/backendUsers";
import { useEffect, useState } from "react";
import CustomMapView from "./components/CustomMapView";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";
import BeHolidaysTest from "./utils/testComponents/BeHolidaysTest";
import BackendTest from "./utils/testComponents/BackendTest";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MainContainer
          user={user}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </SafeAreaProvider>
    </SafeAreaView>
    // <View style={styles.page}>
    //   <BeHolidaysTest />
    //   <BackendTest />
    //   {/* <CustomMapView /> */}
    // </View>
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
