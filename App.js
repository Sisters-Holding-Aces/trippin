import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(process.env.MAPBOX_PUBLIC_API_KEY);

export default function App() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
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
