import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import Mapbox from "@rnmapbox/maps";
import { testFunc } from "./utils/backend";
import BackendTest from "./utils/BackendTest";
import { useEffect, useState } from "react";
Mapbox.setAccessToken(process.env.MAPBOX_PUBLIC_API_KEY);

export default function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    testFunc().then((res) => {
      setTest(res);
    });
  }, []);

  return (
    <View style={styles.page}>
      <BackendTest />
      {/* <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View> */}
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
  container: {
    height: 850,
    width: 500,
  },
  map: {
    flex: 1,
  },
});
