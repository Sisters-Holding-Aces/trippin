import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Text,
  Dialog,
  Portal,
  PaperProvider,
  TextInput,
} from "react-native-paper";
import {
  editHoliday,
  getUserInfo,
  holidaysByUser,
  removeHoliday,
} from "../../utils/backendView";

export default function AllHolidaysScreen({ user }) {
  const [allHolidays, setAllHolidays] = useState([]);
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false);
  const [editBoxVisible, setEditBoxVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [holidayToBeDelete, setHolidayToBeDelete] = useState("");
  const [holidayToBeEdit, setHolidayToBeEdit] = useState("");
  const [newHolidayTitle, setNewHolidayTitle] = useState("");
  const [newHolidayInfo, setNewHolidayInfo] = useState("");

  useEffect(() => {
    getUserInfo(user.displayName).then((res) => {
      setUserId(res.id);
      holidaysByUser(res.id).then((res) => {
        setAllHolidays(res);
      });
    });
  }, [user]);

  useEffect(() => {
    setNewHolidayTitle(holidayToBeEdit.title);
    setNewHolidayInfo(holidayToBeEdit.info);
  }, [holidayToBeEdit]);

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
                <Button
                  onPress={() => {
                    setEditBoxVisible(true);
                    setHolidayToBeEdit(holiday);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onPress={() => {
                    setDeleteBoxVisible(true);
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
            visible={deleteBoxVisible}
            onDismiss={() => {
              setDeleteBoxVisible(false);
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
                  removeHoliday(userId, holidayToBeDelete).then(() => {
                    holidaysByUser(userId).then((res) => {
                      setAllHolidays(res);
                    });
                  });
                  setDeleteBoxVisible(false);
                  setHolidayToBeDelete("");
                }}
              >
                Delete
              </Button>
              <Button
                onPress={() => {
                  setDeleteBoxVisible(false);
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={editBoxVisible}
            onDismiss={() => {
              setEditBoxVisible(false);
            }}
          >
            <Dialog.Title>Edit</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={newHolidayTitle}
                onChangeText={(text) => setNewHolidayTitle(text)}
              />
              <TextInput
                label="Info"
                value={newHolidayInfo}
                onChangeText={(text) => setNewHolidayInfo(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  const promise1 = editHoliday(
                    userId,
                    holidayToBeEdit.id,
                    "title",
                    newHolidayTitle
                  );
                  const promise2 = editHoliday(
                    userId,
                    holidayToBeEdit.id,
                    "info",
                    newHolidayInfo
                  );

                  Promise.all([promise1, promise2]).then(() => {
                    holidaysByUser(userId).then((res) => {
                      setAllHolidays(res);
                    });
                  });
                  setEditBoxVisible(false);
                  setHolidayToBeEdit("");
                }}
              >
                Submit
              </Button>
              <Button
                onPress={() => {
                  setEditBoxVisible(false);
                  setHolidayToBeEdit("");
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
