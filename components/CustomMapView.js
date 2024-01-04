import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const CustomMapView = () => {
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [location, setLocation] = useState({ longitude: -5, latitude: 55 });

  const [coordinates] = useState([-5, 55]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission to access location was denied");

        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const onMarkerPress = () => {
    setCalloutVisible(true);
  };

  const loadAnnotationUK = () => {
    return (
      <Mapbox.PointAnnotation key="annotationUK" id="annotationUK" coordinate={[0.1, 51.5]} onSelected={onMarkerPress}>
        <View
          style={{
            height: 20,
            width: 20,
            backgroundColor: "green",
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 50,
          }}
        ></View>

        <Mapbox.Callout title="Welcome to London!" contentStyle={{ borderRadius: 5 }}></Mapbox.Callout>
      </Mapbox.PointAnnotation>
    );
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />

        <Mapbox.PointAnnotation id="uk" coordinate={coordinates} />
        {/* 
        <Mapbox.PointAnnotation
          id="userLocation"
          coordinate={[location.longitude, location.latitude]}
          title="Your location"
        /> */}

        <View>{loadAnnotationUK()}</View>
      </Mapbox.MapView>
    </View>
  );
};

export default CustomMapView;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
