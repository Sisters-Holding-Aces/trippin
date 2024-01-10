import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBackdrop from "./BackdropComp";
import AllHolidaysScreen from "../../navigation/screens/AllHolidaysScreen"

const BottomModal = ({ setModalOpen, user }) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%"], []);

  const handleClose = () => {
    setModalOpen(null)
  }


  // renders
  return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        // add bottom inset to elevate the sheet
        bottomInset={100}
        topInset={-1200}
        // set `detached` to true
        detached={true}
        style={styles.sheetContainer}
        enablePanDownToClose
        onClose={()=>{handleClose()}}
        handleHeight={100}
        containerStyle={{height: 1700, paddingBottom: 100}}
      >

          <AllHolidaysScreen user={user} />
        
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  sheetContainer: {
    // add horizontal space
    borderRadius: 20,
    marginHorizontal: 40,
    backgroundColor: "grey",
    shadowOffset: {
        width: 10,
        height: 20 ,
      },
      shadowOpacity: 5,
      shadowRadius: 30, 
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomModal;