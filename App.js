import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import { testFunc } from "./utils/backend";
import BackendTest from "./utils/BackendTest";

export default function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    testFunc().then((res) => {
      setTest(res)
    })
  }, []);

  return (
    <View style={styles.container}>
      <BackendTest />
      <Text>mic test</Text>
      <Text>{test}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
