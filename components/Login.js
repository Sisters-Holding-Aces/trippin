import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { createUser, userLogIn, userLogOut } from "../utils/backendView";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleCreateAccount() {
    createUser(email, password, username).then((res) => {
      if (res === "user created") setIsLoggedIn(true);
    });
  }

  function handleLogIn() {
    userLogIn(email, password).then((res) => {
      if (res === "user successfully logged in") setIsLoggedIn(true);
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Button onPress={handleLogIn}>Log In</Button>
        <Button onPress={handleCreateAccount}>Create Account</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 4,
    height: 30,
    padding: 10,
    minWidth: 300,
  },
});
