import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { db } from "./firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(process.env.MAPBOX_PUBLIC_API_KEY);

export default function App() {
  const [test, setTest] = useState("");
  const testRef = collection(db, "test-collection");

  useEffect(() => {
    const getTest = async () => {
      try {
        const contents = await getDocs(testRef);

        const doc = contents.docs[0];

        setTest(doc.data().test_field);
      } catch (err) {
        console.error(err);
      }
    };
    getTest();
  }, []);

  return (
    <View style={styles.container}>
      <Text>mic test from the dev build</Text>
      <Text>{test}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
