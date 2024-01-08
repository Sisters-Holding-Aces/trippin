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
  Modal,
} from "react-native-paper";
import {
  editHoliday,
  editMemory,
  getUserInfo,
  holidaysByUser,
  memoriesByHoliday,
  removeHoliday,
  removeMemory,
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
  const [allMemoriesVisible, setAllMemoriesVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(false);
  const [allMemories, setAllMemories] = useState([]);
  const [memoryDeleteBoxVisible, setMemoryDeleteBoxVisible] = useState(false);
  const [memoryEditBoxVisible, setMemoryEditBoxVisible] = useState(false);
  const [memoryToBeDelete, setMemoryToBeDelete] = useState("");
  const [memoryToBeEdit, setMemoryToBeEdit] = useState("");
  const [newMemoryTitle, setNewMemoryTitle] = useState("");
  const [newMemoryNote, setNewMemoryNote] = useState("");

  useEffect(() => {
    if (user) {
      getUserInfo(user.displayName).then((res) => {
        setUserId(res.id);
        holidaysByUser(res.id).then((res) => {
          setAllHolidays(res);
        });
      });
    }
  }, [user]);

  useEffect(() => {
    setNewHolidayTitle(holidayToBeEdit.title);
    setNewHolidayInfo(holidayToBeEdit.info);
  }, [holidayToBeEdit]);

  useEffect(() => {
    memoriesByHoliday(userId, selectedHoliday.id)
      .then((res) => {
        setAllMemories(res);
      })
      .catch(() => {});
  }, [selectedHoliday]);

  useEffect(() => {
    setNewMemoryTitle(memoryToBeEdit.title);
    setNewMemoryNote(memoryToBeEdit.note);
  }, [memoryToBeEdit]);

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
                  mode="outlined"
                  onPress={() => {
                    setAllMemoriesVisible(true);
                    setSelectedHoliday(holiday);
                  }}
                >
                  See memories
                </Button>

                <Button
                  mode="contained-tonal"
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
          <Modal
            visible={allMemoriesVisible}
            onDismiss={() => {
              setAllMemoriesVisible(false);
              setSelectedHoliday("");
            }}
            contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
          >
            <Card.Title
              title={selectedHoliday.title}
              titleVariant="titleLarge"
            />
            {allMemories.length === 0 ? (
              <Card>
                <Card.Content>
                  <Text variant="bodyMedium">no memory yet...</Text>
                </Card.Content>
              </Card>
            ) : (
              allMemories.map((memory) => {
                return (
                  <Card key={memory.id}>
                    <Card.Content>
                      <Text variant="titleMedium">{memory.title}</Text>
                      <Text variant="bodyMedium">{memory.note}</Text>
                    </Card.Content>
                    <Card.Actions>
                      <Button
                        onPress={() => {
                          setMemoryToBeEdit(memory);
                          setAllMemoriesVisible(false);
                          setMemoryEditBoxVisible(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onPress={() => {
                          setMemoryToBeDelete(memory.id);
                          setAllMemoriesVisible(false);
                          setMemoryDeleteBoxVisible(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Card.Actions>
                  </Card>
                );
              })
            )}
          </Modal>
          <Dialog
            visible={memoryDeleteBoxVisible}
            onDismiss={() => {
              setMemoryDeleteBoxVisible(false);
            }}
          >
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Are you sure you want to delete this memory?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  removeMemory(
                    userId,
                    selectedHoliday.id,
                    memoryToBeDelete
                  ).then(() => {
                    memoriesByHoliday(userId, selectedHoliday.id)
                      .then((res) => {
                        setAllMemories(res);
                      })
                      .catch(() => {});
                  });
                  setMemoryDeleteBoxVisible(false);
                  setAllMemoriesVisible(true);
                  setMemoryToBeDelete("");
                }}
              >
                Delete
              </Button>
              <Button
                onPress={() => {
                  setMemoryDeleteBoxVisible(false);
                  setAllMemoriesVisible(true);
                }}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={memoryEditBoxVisible}
            onDismiss={() => {
              setMemoryEditBoxVisible(false);
            }}
          >
            <Dialog.Title>Edit</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={newMemoryTitle}
                onChangeText={(text) => setNewMemoryTitle(text)}
              />
              <TextInput
                label="Info"
                value={newMemoryNote}
                onChangeText={(text) => setNewMemoryNote(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  const promise1 = editMemory(
                    userId,
                    selectedHoliday.id,
                    memoryToBeEdit.id,
                    "title",
                    newMemoryTitle
                  );
                  const promise2 = editMemory(
                    userId,
                    selectedHoliday.id,
                    memoryToBeEdit.id,
                    "note",
                    newMemoryNote
                  );

                  Promise.all([promise1, promise2]).then(() => {
                    memoriesByHoliday(userId, selectedHoliday.id)
                      .then((res) => {
                        setAllMemories(res);
                      })
                      .catch(() => {});
                  });
                  setMemoryEditBoxVisible(false);
                  setAllMemoriesVisible(true);
                  setMemoryToBeEdit("");
                }}
              >
                Submit
              </Button>
              <Button
                onPress={() => {
                  setMemoryEditBoxVisible(false);
                  setAllMemoriesVisible(true);
                  setMemoryToBeEdit("");
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
