import { useState } from "react";
import { useWindowDimensions, Image, View } from "react-native";
import { FAB } from "react-native-paper";

const NewPinAdder = ({ addPinMode, toggleAddPinMode, onConfirmAddPin, selectEditMode }) => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);

  // calculate the left and top offsets of the new pin marker so that
  // its bottom-center (where the pin tip is) coincides with
  // the window center. The window center's y-position is offset by 50 to account for the nav bar.
  const windowCenter = { x: windowWidth / 2, y: windowHeight / 2 - 50 };
  const newPinSize = { width: 50, height: 50 };
  const newPinLocation = { left: windowCenter.x - newPinSize.width / 2, top: windowCenter.y - newPinSize.height };

  return (
    <>
      <FAB.Group
        open={menuOpen}
        visible
        icon={addPinMode ? "cancel" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Trip",
            onPress: () => {
              toggleAddPinMode();
              selectEditMode("trip");
              setMenuOpen(false);
            },
          },
          {
            icon: "plus",
            label: "Add Memory",
            onPress: () => {
              toggleAddPinMode();
              selectEditMode("memory");
              setMenuOpen(false);
            },
          },
        ]}
        onStateChange={({ open }) => {
          if (addPinMode) {
            // here, the button is in 'cancel' state.
            // toggle add pin mode and reset the chosen edit mode to null
            // on pressing cancel
            toggleAddPinMode();
            selectEditMode(null);
          } else {
            setMenuOpen(open);
          }
        }}
      />

      {/* a pin that appears in the center of the map on toggling 'Add Pin' mode ON */}
      {addPinMode && (
        <Image
          source={require("../../assets/marker-holiday.png")}
          height={newPinSize.height}
          width={newPinSize.width}
          style={{ position: "absolute", left: newPinLocation.left, top: newPinLocation.top }}
        />
      )}

      {addPinMode && (
        <FAB
          icon="check"
          style={customStyles.checkmarkButton}
          onPress={onConfirmAddPin}
          accessibilityLabel="Confirm add pin"
          variant="primary"
          color="#F9F9F9"
        />
      )}
    </>
  );
};

export default NewPinAdder;

const customStyles = {
  addButtonPortal: {
    paddingBottom: 76,
  },
  checkmarkButton: {
    position: "absolute",
    margin: 16,
    right: 70,
    bottom: 0,
    backgroundColor: "#41AB64",
  },
  floatingMenu: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
    gap: 16,
  },
};
