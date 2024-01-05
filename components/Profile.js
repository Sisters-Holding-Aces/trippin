import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { getUserInfo } from "../utils/backendView";

export default function Profile({ user }) {
  const [userInfo, setUserInfo]= useState({})

  useEffect(()=>{
    getUserInfo(user.displayName).then((res)=>{
        setUserInfo(res)
    })
  },[])

  return (
    <View style={styles.container}>
      <Avatar.Text style={styles.avatar} size={150} label={user.displayName} />
      {userInfo.bio ? (
        <Card style={styles.bio}>
          <Card.Content>
            <Text variant="titleLarge">Bio</Text>
            <Text variant="bodyMedium">{userInfo.bio}</Text>
          </Card.Content>
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    margin: 20,
  },
  bio: {
    maxWidth: 300,
    minWidth: 300,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
