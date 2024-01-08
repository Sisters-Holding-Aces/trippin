import { StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import markerHoliday from "../../assets/marker-holiday.png";
import markerMemory from "../../assets/marker-memory.png";
import Mapbox from "@rnmapbox/maps";
import HolidayPopup from "./HolidayPopup";
import MemoryPopup from "./MemoryPopup";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MapWithPopups = ({ holidays }) => {
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);

  const mapView = useRef(null);

  const [coordinates] = useState(holidays[0].locationData);

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
            id: memory.id,
            title: memory.title,
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
    console.log("feature properties: ", feature.properties);

    if (popupType === "holiday") {
      if (selectedHoliday === id) {
        setSelectedHoliday(null);
      } else {
        setSelectedHoliday(id);
      }
    } else if (popupType === "memory") {
      if (selectedMemory === id) {
        setSelectedMemory(null);
      } else {
        setSelectedMemory(id);
      }
    }
  };

  const renderMemoryPopups = () => {
    const memoryPopups = [];

    holidays.forEach((holiday) => {
      holiday.memories.forEach((memory) => {
        memoryPopups.push(
          <MemoryPopup
            key={`memoryPopup-${holiday.id}-${memory.id}`}
            memory={memory}
            isSelected={selectedMemory === memory.id ? true : false}
            setSelectedMemory={setSelectedMemory}
          />
        );
      });
    });

    return memoryPopups;
  };

  const renderHolidayPopups = () => {
    return holidays.map((holiday) => {
      return (
        <HolidayPopup
          key={`holidayPopup-${holiday.id}`}
          holiday={holiday}
          isSelected={selectedHoliday === holiday.id ? true : false}
          setSelectedHoliday={setSelectedHoliday}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map} styleURL={Mapbox.StyleURL.Street} ref={mapView}>
        <Mapbox.Camera zoomLevel={4} centerCoordinate={coordinates} />

        <Mapbox.Images images={{ markerHoliday, markerMemory }} />

        {/* memories layer */}
        <Mapbox.ShapeSource id="memoryPinsSource" shape={memoryFeatureCollection} onPress={onPinPress}>
          <Mapbox.SymbolLayer id="memoryPinsLayer" style={customStyles.memoryPinsLayer} minZoomLevel={8} />
          {renderMemoryPopups()}
        </Mapbox.ShapeSource>

        {/* holidays layer: rendered above and after the memories layer */}
        <Mapbox.ShapeSource id="holidayPinsSource" shape={holidayFeatureCollection} onPress={onPinPress}>
          <Mapbox.SymbolLayer id="holidayPinsLayer" style={customStyles.holidayPinsLayer} maxZoomLevel={8} />
          {renderHolidayPopups()}
        </Mapbox.ShapeSource>
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
