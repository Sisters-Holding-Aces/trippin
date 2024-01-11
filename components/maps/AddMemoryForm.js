import { useState } from "react";
import { View, Text } from "react-native";
import { Button, Dialog, TextInput, RadioButton, Portal } from "react-native-paper";

const AddMemoryForm = ({ newLocation, exitEditMode, handleAddMemory, setAdding, holidays }) => {
  const [titleInput, setTitleInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [showHolidayOptions, setShowHolidayOptions] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(holidays[0].id);
  const [selectedHolidayTitle, setSelectedHolidayTitle] = useState(holidays[0].title);

  const hideDialog = () => setVisible(false);

  const handleDismiss = () => {
    hideDialog();
    exitEditMode();
  };

  const holidayOptionsDialog = () => {
    return (
      <Dialog
        visible={showHolidayOptions}
        onDismiss={() => {
          setShowHolidayOptions(false);
        }}
        dismissable={false}
      >
        <Dialog.Title>Choose a holiday</Dialog.Title>
        <Dialog.Content style={styles.form}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              const [holidayId, holidayTitle] = newValue.split(":");
              setSelectedHoliday(holidayId);
              setSelectedHolidayTitle(holidayTitle);
            }}
            value={selectedHoliday + ":" + selectedHolidayTitle}
          >
            {holidays.map((holiday) => {
              return (
                <View key={holiday.id}>
                  <Text>{holiday.title}</Text>
                  <RadioButton value={holiday.id + ":" + holiday.title} />
                </View>
              );
            })}
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setShowHolidayOptions(false);
              setVisible(true);
            }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              setShowHolidayOptions(false);
              setVisible(true);
            }}
          >
            Confirm
          </Button>
        </Dialog.Actions>
      </Dialog>
    );
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>New Memory</Dialog.Title>
        <Dialog.Content style={styles.form}>
          <TextInput
            label="Title"
            value={titleInput}
            onChangeText={(text) => setTitleInput(text)}
            mode="outlined"
            placeholder="A new trip title"
          />
          <Button
            onPress={() => {
              setVisible(false);
              setShowHolidayOptions(true);
            }}
          >
            Choose a holiday
          </Button>
          <TextInput
            label="Selected holiday"
            disabled
            value={selectedHolidayTitle}
            mode="outlined"
            placeholder="Selected holiday"
          />
          <TextInput
            label="Location"
            disabled
            value={newLocation.longitude + ", " + newLocation.latitude}
            onChangeText={(text) => setTitleInput(text)}
            mode="outlined"
            placeholder="A new trip title"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              console.log("Cancelling: add memory");
              handleDismiss();
            }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              console.log("Submitting: add memory");
              setAdding(true);
              handleAddMemory(titleInput, selectedHoliday);
              handleDismiss();
            }}
          >
            Add Memory
          </Button>
        </Dialog.Actions>
      </Dialog>
      {holidayOptionsDialog()}
    </Portal>
  );
};

export default AddMemoryForm;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    gap: 10,
  },
};
