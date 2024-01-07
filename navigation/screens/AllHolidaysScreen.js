import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Text,
  Dialog,
  Portal,
  PaperProvider,
} from "react-native-paper";
import {
  getUserInfo,
  holidaysByUser,
  removeHoliday,
} from "../../utils/backendView";

export default function AllHolidaysScreen({ user }) {
  const [allHolidays, setAllHolidays] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [holidayToBeDelete, setHolidayToBeDelete] = useState("");

  useEffect(() => {
    getUserInfo(user.displayName).then((res) => {
      setUserId(res.id);
      holidaysByUser(res.id).then((res) => {
        setAllHolidays(res);
      });
    });
  }, [user]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card.Title title="All holidays" titleVariant="titleLarge" />
        {allHolidays.map((holiday) => {
          return (
            <Card key={holiday.id}>
              <Card.Content>
                <Text variant="titleMedium">{holiday.title}</Text>
                {holiday.info ? (
                  <Text variant="bodyMedium">{holiday.info}</Text>
                ) : null}
              </Card.Content>
              <Card.Actions>
                <Button>Edit</Button>
                <Button
                  onPress={() => {
                    setVisible(true);
                    setHolidayToBeDelete(holiday.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}
          >
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                By deleting this holiday, you will delete all the associated
                memories as well.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  removeHoliday(userId, holidayToBeDelete).then(()=>{
                    holidaysByUser(userId).then((res) => {
                        setAllHolidays(res);
                      });
                  })
                  setVisible(false);
                  setHolidayToBeDelete("");
                }}
              >
                Delete
              </Button>
              <Button
                onPress={() => {
                  setVisible(false);
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
