import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import "../assets/airplane-icon-png-2506.png"

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
        <Card style={{width: "70%", height: "35%", alignItems: "center"}}>
        <Card.Content>
          <Text style={{alignSelf: "center"}} variant="headlineLarge">{sheetData.title}</Text>
        </Card.Content>
        <Card.Cover style={{backgroundColor: "clear", maxHeight: "50%",}} resizeMode="contain" source={{ uri: 'https://cdn-icons-png.flaticon.com/512/562/562740.png' }} />
        <Card.Actions>
          <Button mode="text">Edit</Button>
          <Button mode="text">Share</Button>
          <Button mode="text">Delete</Button>
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
    padding: 0,
  },
});

export default ActionSheet;
