import { StyleSheet, Text, View } from "react-native";
// import Header from "../../components/Header";
import CustomMapView from "../../components/CustomMapView";
import MapWithPopups from "../../components/maps/MapWithPopups";
import { ToggleButton } from "react-native-paper";
import { useState } from "react";

export default function HomeScreen() {
  const [status, setStatus] = useState(false);

  const onButtonToggle = (value) => {
    setStatus(status === "checked" ? "unchecked" : "checked");
  };

  // console.log(status);

  const testData = [
    {
      title: "Berlin",
      locationData: [13.4317618, 52.4827483],
      startDate: "2021-01-03T02:00:00.000Z",
      info: "My Trip to Berlin.",
      id: "001",
      memories: [
        {
          title: "Park",
          locationData: [13.353087951539997, 52.51339022910384],
          date: "2021-01-03T23:59:01.000Z",
          info: "Had a lovely walk in this beautiful park.",
          id: "001",
        },
        {
          title: "Wall",
          locationData: [13.44111, 52.50444],
          date: "2021-01-06T23:01:01.000Z",
          info: "It's lovely!",
          id: "002",
        },
      ],
    },
    {
      title: "Liverpool:",
      locationData: [-2.983333, 53.400002],
      startDate: "2022-04-05T06:00:00.000Z",
      info: "My amazing trip to Liverpool!",
      id: "002",
      memories: [
        {
          title: "Boating Lake:",
          locationData: [-2.9364495277404785, 53.38420486450195],
          date: "2022-04-06T23:01:01.000Z",
          info: "A relaxing walk around the lake.",
          id: "001",
        },
        {
          title: "Museum:",
          locationData: [-2.9955708980560303, 53.402976989746094],
          date: "2022-04-07T23:01:01.000Z",
          info: "It's lovely!",
          id: "002",
        },
      ],
    },
  ];

  return (
    <>
      {/* <Header /> */}
      <View style={styles.container}>
        <ToggleButton
          style={styles.IconButton}
          size={40}
          icon="earth-plus"
          iconColor="blue"
          value="add-trip"
          status={status}
          onPress={onButtonToggle}
        />
        <MapWithPopups holidays={testData} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  IconButton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: "5%",
    right: "10%",
    zIndex: 1,
  },
});
