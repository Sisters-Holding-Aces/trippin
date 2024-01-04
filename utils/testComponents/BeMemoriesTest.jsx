import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addMemory, memoriesByHoliday, memoryById } from "../backendView";
import { timestampToDate } from "../utils";

export default BeMemoriesTest = () => {
    const [memories, setMemories] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        memoriesByHoliday("RKeEweJmC96pOoZEmzQn", "n0nzH7o7Y05e86nUwA8A").then((res) => {
            setMemories(res);
        });
        // memoryById("RKeEweJmC96pOoZEmzQn", "n0nzH7o7Y05e86nUwA8A", 'OfrPbbsseZYWPTXyiSY7').then((res) => {
        //     console.log(res)
        // })
        setChange(false)
      }, [change]);
    
      const dateChanger = (dateObj) => {
        const newDate = timestampToDate(dateObj)
        return newDate.date
      }

    const newMemory = () => {
        const userId = 'RKeEweJmC96pOoZEmzQn'
        const holidayId = 'n0nzH7o7Y05e86nUwA8A'
        const title = 'Checkpoint Charlie';
        const locationData = { latitude: 52.5075, longitude: 13.3904 };
        addMemory(userId, holidayId, title, locationData)
        setChange(true)
    }

    return (
        <View>
            {memories.map((memory) => {
                return (
                <View>
                    <Text>{memory.title} - {dateChanger(memory.date)} - {memory.note ? memory.note : 'noinfo'}</Text>
                    {/* {console.log(memory.locationData.latitude)} */}
                    {/* <Button onPress={() => changeHol(hol.id)} title="change holiday"></Button> */}
                    {/* <Button onPress={() => delHol(hol.id)} title="delete holiday"></Button> */}
                </View>
                );
            })}
            <Button onPress={newMemory} title="new memory"></Button>
        </View>
    )
}