import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

export default function Profile({ user }) {
  return (
    <View style={styles.container}>
      <Avatar.Text style={styles.avatar} size={150} label={user.displayName} />
      {user.bio ? (
        <Card style={styles.bio}>
          <Card.Content>
            <Text variant="titleLarge">Bio</Text>
            <Text variant="bodyMedium">{user.bio}</Text>
          </Card.Content>
        </Card>
      ) : null}
      <Card style={styles.bio}>
        <Card.Content>
          <Text variant="titleLarge">Bio</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
      </Card>
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
