import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import { useEffect, useState } from "react";
import CustomMapView from "./components/CustomMapView";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";
import { userCheck } from "./utils/backendView";

export default function App() {
  const [user, setUser] = useState(null);
  const [userloggedin, setUserloggedin] = useState(false);

  useEffect(() => {
    const userChecker = userCheck("bool");
    if (!userChecker) {
      setUser(null);
    } else {
      const userdata = userCheck();
      setUser(userdata);
    }
    setUserloggedin(false);
  }, [userloggedin]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <MainContainer user={user} setUser={setUser} setUserloggedin={setUserloggedin} />
        </SafeAreaProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
    // <View style={styles.page}>
    //   <CustomMapView />
    // </View>
    // <BackendTest />
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
