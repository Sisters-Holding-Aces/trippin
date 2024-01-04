import { Text, View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { auth } from "../../firebaseconfig";
import Login from "../../components/Login";
import { logOut } from "../../utils/authentication";

export default function ProfileScreen({ user }) {
  console.log("PROFILE USER", user);
  return (
    <>
      <Header />
      {user ? (
        <View style={styles.container}>
          <Text>Hello</Text>
          <Button onPress={logOut()}>Log Out</Button>
        </View>
      ) : (
        <Login />
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
