import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseconfig";
import {
  allUsers,
  createUser,
  deleteAccount,
  editUserInfo,
  getUserInfo,
  userCheck,
  userLogIn,
  userLogOut,
} from "../backendView";

export default BeUsersTest = () => {
  const [userArray, setUserArray] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [logInOut, setLogInOut] = useState(false);

  useEffect(() => {
    allUsers().then((res) => setUserArray(res));
    getUserInfo("example9").then((res) => {
      setUserInfo(res);
    });
  }, [logInOut]);

  useEffect(() => {
    setLogInOut(false);
  }, [logInOut]);

  const signUp = async () => {
    await createUser("ex02@test.com", "pass123", "ex02").then((res) =>
      console.log(res)
    );
    setLogInOut(true);
  };

  const signIn = async () => {
    await userLogIn("ex01@test.com", "pass123").then((res) => console.log(res));
    setLogInOut(true);
  };

  const signOut = async () => {
    await userLogOut();
    setUserInfo({});
    setLogInOut(true);
  };

  const updatedUser = () => {
    editUserInfo("bio", "helloooo", "JqijYB2RTXwLKi3bSWXX");
  };

  const deleteAccount2 = () => {
    deleteAccount().then((res) => {
      console.log(res);
    });
  };

  const [isSignedIn, setIsSignedIn] = useState(false)


  const tester = () => {
    const userChecker = userCheck('bool')
    setIsSignedIn(userChecker)
    console.log(isSignedIn)
  }

  const userInOut = () => {
    const user = userCheck()
    if (user.displayName) return user.displayName
    else return user.msg
  }

  return (
    <View>
      <Text>BE working...</Text>
      <Button onPress={signUp} title="newUser"></Button>
      <Button onPress={signIn} title="login"></Button>
      <Text>{userInOut()}</Text>
      <Button onPress={signOut} title="logOut"></Button>
      <Button onPress={updatedUser} title="update user"></Button>
      <Button onPress={deleteAccount2} title="delete"></Button>
      <Button onPress={tester} title="test"></Button>
    </View>
  );
};
