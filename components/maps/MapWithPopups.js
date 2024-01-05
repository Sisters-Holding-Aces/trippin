import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
// import * as Location from "expo-location";
import Mapbox from "@rnmapbox/maps";
import { Button, Card, IconButton, Text } from "react-native-paper";
import MarkerWithPopup from "./MarkerWithPopup";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MapWithPopups = ({ holidays }) => {
  const [location, setLocation] = useState({ longitude: -5, latitude: 55 });
  const [selectedHoliday, setSelectedHoliday] = useState();
  const mapView = useRef(null);

  const [coordinates] = useState([-2.983333, 53.400002]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} deselectAnnotationOnTap ref={mapView}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />

        {holidays.map((holiday) => {
          return <MarkerWithPopup key={`MarkerView-${holiday.locationData.join("-")}`} holiday={holiday} />;
        })}
      </Mapbox.MapView>
    </View>
  );
};

export default MapWithPopups;

const customStyles = {
  callout: {
    borderRadius: 5,
    padding: 10,
  },
};

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
