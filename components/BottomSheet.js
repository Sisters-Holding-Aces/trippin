import React, { useCallback, useState, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";

const ActionSheet = ({ setMoreInfo, sheetData}) => {
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = useMemo(() => ["10%", "25%", "50%", "75%", "100%"], []);

  const handleSheetChanges = () => {};

  const handleOpenSheet = () => {

  }

  const handleCloseSheet = () =>{
    setIsOpen(false)
    setMoreInfo(false)
  }


  return (
    <>
      <BottomSheet enablePanDownToClose ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges} onClose={handleCloseSheet}>
        <BottomSheetView style={styles.contentContainer}>
        <Card>
        <Card.Content>
          <Text variant="titleLarge"></Text>
          <Text variant="bodyMedium"></Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://www.germany.travel/media/redaktion/staedte_kultur_content/Berlin_Brandenburger_Tor_im_Sonnenuntergang_Leitmotiv_German_Summer_Cities.jpg' }} />
        <Card.Actions>
          <Button mode="text">Edit</Button>
          <TouchableOpacity mode="text"><Text>Share</Text></TouchableOpacity>
        </Card.Actions>
      </Card>
        <Card style={{width: "100%"}}>
            <Card.Content>
            <Text variant="titleLarge">Memory 1</Text>
                  <Text variant="bodyMedium">Omg such a good memory</Text>
            </Card.Content>
        </Card>
        <Card style={{width: "100%"}}>
            <Card.Content>
            <Text variant="titleLarge">Memory 1</Text>
                  <Text variant="bodyMedium">Omg such a good memory</Text>
            </Card.Content>
        </Card>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ActionSheet;
