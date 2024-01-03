import { Text, View } from "react-native";
import Header from "../../components/Header";

export default function ProfileScreen() {
  return (
    <>
      <Header />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
      </View>
    </>
  );
}
