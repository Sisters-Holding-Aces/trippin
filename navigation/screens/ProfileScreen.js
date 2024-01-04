import { Text, View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { TextInput, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseconfig";
import Login from "../../components/Login";
import { userLogOut } from "../../utils/backendView";

export default function ProfileScreen({ user, isLoggedIn, setIsLoggedIn }) {
  console.log("PROFILE USER", user);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <View style={styles.container}>
          <Text>Hello {user.displayName}</Text>
          <Button
            onPress={() => {
              userLogOut();
              setIsLoggedIn(false);
            }}
          >
            Log Out
          </Button>
        </View>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
