import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Dialog, TextInput } from "react-native-paper";

const AddMemoryForm = ({ newLocation, exitEditMode, handleAddMemory, setAdding, holidays }) => {
  const [titleInput, setTitleInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const [availableHolidays, setAvailableHolidays] = useState(
    holidays.map((holiday) => {
      return { label: holiday.title, value: holiday.id };
    })
  );

  const hideDialog = () => setVisible(false);

  const handleDismiss = () => {
    hideDialog();
    exitEditMode();
  };

  return (
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
        <DropDownPicker
          open={showDropDown}
          value={selectedHoliday}
          items={availableHolidays}
          setOpen={() => setShowDropDown(true)}
          setValue={setSelectedHoliday}
          setItems={setAvailableHolidays}
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
