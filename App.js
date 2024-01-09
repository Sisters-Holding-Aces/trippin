import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MainContainer from "./navigation/MainContainer";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";

import { useEffect, useState } from "react";
import CustomMapView from "./components/CustomMapView";

import { userCheck } from "./utils/backendView";
import BackendTest from "./utils/testComponents/BackendTest";

export default function App() {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const userSet = async () => {
      const userChecker = await userCheck("bool");
      if (!userChecker) {
        setUser(null);
      } else {
        const userdata = await userCheck();
        setUser(userdata);
      }
    };
    userSet();
    setUserLoggedIn(false);
  }, [userLoggedIn]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MainContainer user={user} setUser={setUser} setUserLoggedIn={setUserLoggedIn} />
      </SafeAreaProvider>
    </SafeAreaView>
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
