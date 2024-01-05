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
  const [userInfo, setUserInfo] = useState({});
  const [logInOut, setLogInOut] = useState(false);

  const testEmail = "ex07@test.com"
  const testPass = "pass123"
  const testUsername = "ex07"

  useEffect(() => {
    const setUser = async () => {
      const userChecker = userCheck('bool')
      if (userChecker) {
        const userData = userCheck()
        const userDocData = await getUserInfo(userData.displayName)
        setUserInfo(userDocData)
      } else {
        setUserInfo({})
      }
    }
    setUser()
    setLogInOut(false);
  }, [logInOut]);

  const signUp = async () => {
    await createUser(testEmail, testPass, testUsername).then((res) =>
      console.log(res)
    );
    setLogInOut(true);
  };

  const signIn = async () => {
    await userLogIn(testEmail, testPass).then((res) => console.log(res));
    setLogInOut(true);
  };

  const signOut = async () => {
    await userLogOut();
    setLogInOut(true);
  };

  const userUpdater = () => {
    if (userInfo.id) {
      editUserInfo(userInfo.id, "bio", "Hi :)").then((res) => {
        console.log(res)
      });
      setLogInOut(true);
    }
  };

  const deleteAccount2 = () => {
    deleteAccount().then((res) => {
      console.log(res);
    });
  };

  const userInfoFunc = () => {
    if (userInfo?.username) {
      return (
        <View>
          <Text>
            - {userInfo.username} -
            - {userInfo.email} -
            - {userInfo.bio} -
          </Text>
        </View>
      )
    }
  }

  return (
    <View>
      <Text>BE working...</Text>
      <Button onPress={signUp} title="newUser"></Button>
      <Button onPress={signIn} title="login"></Button>
      <Text>{userInfoFunc()}</Text>
      <Button onPress={signOut} title="logOut"></Button>
      <Button onPress={userUpdater} title="update user"></Button>
      <Button onPress={deleteAccount2} title="delete"></Button>
    </View>
  );
};
