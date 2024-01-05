import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import markerHoliday from "../../assets/marker-holiday.png";
import markerMemory from "../../assets/marker-memory.png";
// import * as Location from "expo-location";
import Mapbox, { FillLayer, Images, LineLayer, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { Button, Card, IconButton, Text } from "react-native-paper";
import HolidayPopup from "./HolidayPopup";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MapWithPopups = ({ holidays }) => {
  const [location, setLocation] = useState({ longitude: -5, latitude: 55 });
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const mapView = useRef(null);

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

  const [holidayFeatureCollection, setHolidayFeatureCollection] = useState({
    type: "FeatureCollection",
    features: [
      ...holidays.map((holiday) => {
        return {
          type: "Feature",
          id: `holiday-${holiday.id}`,
          properties: {
            popupType: "holiday",
            id: holiday.id,
            description: holiday.info,
          },
          geometry: {
            type: "Point",
            coordinates: holiday.locationData,
          },
        };
      }),
    ],
  });

  const [memoryFeatureCollection, setMemoryFeatureCollection] = useState({});

  const getMemoryFeatures = (holidays) => {
    const memoryFeatures = [];
    holidays.forEach((holiday) => {
      holiday.memories.forEach((memory) => {
        const memoryGeoJson = {
          type: "Feature",
          id: `memory-${memory.id}`,
          properties: {
            popupType: "memory",
            description: memory.info,
          },
          geometry: {
            type: "Point",
            coordinates: memory.locationData,
          },
        };

        memoryFeatures.push(memoryGeoJson);
      });
    });

    return memoryFeatures;
  };

  useEffect(() => {
    const memoriesGeoJson = {
      type: "FeatureCollection",
      features: getMemoryFeatures(holidays),
    };

    setMemoryFeatureCollection(memoriesGeoJson);
  }, []);

  const onPinPress = (e) => {
    console.log("Pin PRESSED!!");
    console.log(e);
    const feature = e.features[0];
    const { popupType, id } = feature.properties;

    if (popupType === "holiday") {
      if (selectedHoliday === id) {
        setSelectedHoliday(null);
      } else {
        setSelectedHoliday(id);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Street} ref={mapView}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />

        <Mapbox.Images images={{ markerHoliday, markerMemory }} />

        <Mapbox.ShapeSource id="memoryPinsSource" shape={memoryFeatureCollection} onPress={onPinPress}>
          <Mapbox.SymbolLayer id="memoryPinsLayer" style={customStyles.memoryPinsLayer} minZoomLevel={8} />
        </Mapbox.ShapeSource>

        <Mapbox.ShapeSource id="holidayPinsSource" shape={holidayFeatureCollection} onPress={onPinPress}>
          <Mapbox.SymbolLayer id="holidayPinsLayer" style={customStyles.holidayPinsLayer} maxZoomLevel={8} />
          {holidays.map((holiday) => {
            return (
              <HolidayPopup
                key={`holidayPopup-${holiday.id}`}
                holiday={holiday}
                isSelected={selectedHoliday === holiday.id ? true : false}
                setSelectedHoliday={setSelectedHoliday}
              />
            );
          })}
        </Mapbox.ShapeSource>

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
  holidayPinsLayer: {
    iconAllowOverlap: true,
    iconAnchor: "bottom",
    iconSize: 1.0,
    iconImage: "markerHoliday",
  },
  memoryPinsLayer: {
    iconAllowOverlap: true,
    iconAnchor: "bottom",
    iconSize: 1.0,
    iconImage: "markerMemory",
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
