import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const ActionSheet = ({ setMoreInfo, sheetData}) => {
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true)

  const snapPoints = useMemo(() => ["10%", "30%", "50%", "75%", "100%"], []);

  const handleSheetChanges = () => {};

  const handleCloseSheet = () =>{
    setIsOpen(false)
    setMoreInfo(false)
  }

  useEffect(()=>{
    if (!sheetData){
      setIsLoading(true)
      console.log("loading")
    } else {
      setIsLoading(false)
    }
  }, [sheetData])


  return (
    <>
      <BottomSheet enablePanDownToClose ref={bottomSheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges} onClose={handleCloseSheet}>
        <BottomSheetView style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.blueGrey100} size={"large"} />
        ) :
        (
          <>
        <Card>
        <Card.Content>
          <Text variant="headlineLarge">{sheetData.title}</Text>
          <Text variant="bodyMedium"></Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fflight_562740&psig=AOvVaw1mZYUMBNgyO_6ihur-vw4g&ust=1704894549841000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLCTkqe50IMDFQAAAAAdAAAAABAJ' }} />
        <Card.Actions>
          <Button mode="text">Edit</Button>
          <TouchableOpacity mode="text"><Text>Share</Text></TouchableOpacity>
        </Card.Actions>
      </Card>
        </>)}
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
