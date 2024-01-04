import { Button, Text, View } from "react-native";
import { getUsers, getUserByName, patchUser } from "./backend";
import { useEffect, useState } from "react";
import { createAccount, logIn, logOut, removeUser } from "./authentication";
import { auth } from "../firebaseconfig";

export default BackendTest = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [logInOut, setLogInOut] = useState(false);

  useEffect(() => {
    getUsers().then((res) => setAllUsers(res));
    getUserByName("example2").then((res) => {
      setUserInfo(res[0]);
    });
  }, []);

  useEffect(() => {
    setLogInOut(false);
  }, [logInOut]);

  const signUp = async () => {
    await createAccount("abcd@hello13.com", "pass345", "example13").then(
      (res) => console.log(res)
    );
    setLogInOut(true);
  };

  const signIn = async () => {
    await logIn("abcd@hello9.com", "pass345").then((res) => console.log(res));
    setLogInOut(true);
  };

  const signOut = async () => {
    await logOut();
    setUserInfo({});
    setLogInOut(true);
  };

  const viewUser = () => {
    if (userInfo.username) {
      return (
        <View>
          <Text>{userInfo.username}</Text>
          {userInfo.bio ? <Text>{userInfo.bio}</Text> : <Text>No Bio</Text>}
          {userInfo.avatar ? (
            <Text>{userInfo.avatar}</Text>
          ) : (
            <Text>No avatar</Text>
          )}
        </View>
      );
    } else {
      return <Text>No active user</Text>;
    }
  };

  const updatedUser = () => {
    patchUser("bio", "helloooo", "AY8BNYW9TpCufgw8cJFw");
  };

  const deleteAccount = () => {
    removeUser().then((res)=>{console.log(res);});
  };

  return (
    <View>
      <Text>BE working...</Text>
      {viewUser()}
      <Button onPress={signUp} title="newUser"></Button>
      <Button onPress={signIn} title="login"></Button>
      <Text>User: {auth?.currentUser?.displayName}</Text>
      <Button onPress={signOut} title="logOut"></Button>
      <Button onPress={updatedUser} title="update user"></Button>
      <Button onPress={deleteAccount} title="delete"></Button>
    </View>
  );
};
