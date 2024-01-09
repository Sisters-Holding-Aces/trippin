import { StyleSheet, View } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import markerHoliday from "../../assets/marker-holiday.png";
import markerMemory from "../../assets/marker-memory.png";
import Mapbox from "@rnmapbox/maps";
import HolidayPopup from "./HolidayPopup";
import MemoryPopup from "./MemoryPopup";
import {
  holidaysGeoJsonFromData,
  memoriesGeoJsonFromData,
} from "../../utils/maps/geojson";
import ActionSheet from "../BottomSheet";

Mapbox.setAccessToken(
  process.env.MAPBOX_PUBLIC_API_KEY ||
    "pk.eyJ1IjoiYWs1Y2VsIiwiYSI6ImNscHF6MzN2OTA1YTkybG84Mmg5N2YydmgifQ.RAh-0bozPVgFnKfqWvAk2g"
);

const MapWithPopups = ({ holidays, memories }) => {
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [bottomSheet, setBottomSheet] = useState();
  const [sheetData, setSheetData] = useState();

  const mapView = useRef(null);
  const camera = useRef(null);

  const [coordinates, setCoordinates] = useState([
    holidays[0].locationData.longitude,
    holidays[0].locationData.latitude,
  ]);

  const holidayFeatureCollection = useMemo(
    () => holidaysGeoJsonFromData(holidays),
    [holidays]
  );

  const memoryFeatureCollection = useMemo(
    () => memoriesGeoJsonFromData(memories),
    [memories]
  );

  const onPinPress = async (e) => {
    // gets the geojson feature at the pin
    const feature = e.features[0];
    const { popupType, id } = feature.properties;
    setSheetData(feature.properties);

    // centers the selected pin on the screen
    setCoordinates(feature.geometry.coordinates);

    // sets selected holiday/memory
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
    return memories.map((memory) => {
      return (
        <MemoryPopup
          key={`memoryPopup-${memory.id}`}
          memory={memory}
          isSelected={selectedMemory === memory.id ? true : false}
          setSelectedMemory={setSelectedMemory}
          setMoreInfo={setMoreInfo}
        />
      );
    });
  };

  const renderHolidayPopups = () => {
    return holidays.map((holiday) => {
      return (
        <HolidayPopup
          key={`holidayPopup-${holiday.id}`}
          holiday={holiday}
          isSelected={selectedHoliday === holiday.id ? true : false}
          setSelectedHoliday={setSelectedHoliday}
          setMoreInfo={setMoreInfo}
        />
      );
    });
  };

  useEffect(() => {
    setBottomSheet(
      <ActionSheet sheetData={sheetData} setMoreInfo={setMoreInfo} />
    );
  }, [moreInfo]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.TrafficNight}
        ref={mapView}
        compassEnabled={true}
        scaleBarEnabled={false}
      >
        <Mapbox.Camera
          centerCoordinate={coordinates}
          animationDuration={700}
          ref={camera}
        />

        <Mapbox.Images images={{ markerHoliday, markerMemory }} />

        {/* memories layer */}
        <Mapbox.ShapeSource
          id="memoryPinsSource"
          shape={memoryFeatureCollection}
          onPress={onPinPress}
        >
          <Mapbox.SymbolLayer
            id="memoryPinsLayer"
            style={customStyles.memoryPinsLayer}
            minZoomLevel={8}
          />
          {renderMemoryPopups()}
        </Mapbox.ShapeSource>

        {/* holidays layer: rendered above and after the memories layer */}
        <Mapbox.ShapeSource
          id="holidayPinsSource"
          shape={holidayFeatureCollection}
          onPress={onPinPress}
        >
          <Mapbox.SymbolLayer
            id="holidayPinsLayer"
            style={customStyles.holidayPinsLayer}
            maxZoomLevel={8}
          />
          {renderHolidayPopups()}
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
      {moreInfo && bottomSheet}
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
