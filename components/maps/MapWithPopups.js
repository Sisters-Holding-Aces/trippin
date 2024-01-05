import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
// import * as Location from "expo-location";
import Mapbox, { FillLayer, Images, LineLayer, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
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
  const [images, setImages] = useState({ options: { markerHoliday: "../../assets/marker-holiday.png" } });

  const [coordinates] = useState([-2.983333, 53.400002]);

  const [polygon, setPolygon] = useState({
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [72.685547, 20.055931],
          [76.640625, 21.207458],
          [76.904297, 17.978733],
          [72.685547, 20.055931],
        ],
      ],
    },
  });

  const holidayFeatureCollection = {
    type: "FeatureCollection",
    features: [
      ...holidays.map((holiday) => {
        return {
          type: "Feature",
          id: `holiday-${holiday.id}`,
          properties: {
            icon: "markerHoliday",
            description: holiday.info,
          },
          geometry: {
            type: "Point",
            coordinates: holiday.locationData,
          },
        };
      }),
    ],
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Dark} deselectAnnotationOnTap ref={mapView}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />

        {/* {holidays.map((holiday) => {
          return <MarkerWithPopup key={`MarkerView-${holiday.locationData.join("-")}`} holiday={holiday} />;
        })} */}

        <Images images={images.options} />

        <ShapeSource id="holidayShapeSource" shape={holidayFeatureCollection}>
          <SymbolLayer id="holidayIconsLayer" style={customStyles.icon} minZoomLevel={4} />
        </ShapeSource>

        <ShapeSource id="source" shape={polygon}>
          <FillLayer id="fill" style={{ fillColor: "blue", fillOpacity: 0.7 }} />
          <LineLayer id="line" style={{ lineColor: "red", lineWidth: 2 }} />
        </ShapeSource>
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
  icon: {
    iconImage: ["get", "icon"],
    iconSize: 100,
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
