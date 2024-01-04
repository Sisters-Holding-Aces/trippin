import { Text, View } from "react-native";
// import Header from "../../components/Header";
import CustomMapView from "../../components/CustomMapView";

export default function HomeScreen() {
  return (
    <>
      {/* <Header /> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text>Home Screen</Text> */}
        <CustomMapView />
      </View>
    </>
  );
}
