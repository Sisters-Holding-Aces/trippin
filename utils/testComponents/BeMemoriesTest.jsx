import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addMemory, editMemory, memoriesByHoliday, memoryById, removeMemory } from "../backendView";
import { timestampToDate } from "../utils";

export default BeMemoriesTest = () => {
    const [memories, setMemories] = useState([]);
    const [change, setChange] = useState(false);

    const userId = 'RKeEweJmC96pOoZEmzQn'
    const holidayId = 'n0nzH7o7Y05e86nUwA8A'

    useEffect(() => {
        memoriesByHoliday(userId, holidayId).then((res) => {
            setMemories(res);
        });
        // memoryById(userId, holidayId, 'OfrPbbsseZYWPTXyiSY7').then((res) => {
        //     console.log(res)
        // })
        setChange(false)
      }, [change]);
    
      const dateChanger = (dateObj) => {
        const newDate = timestampToDate(dateObj)
        return newDate.date
      }

    const newMemory = () => {
        const title = 'Checkpoint Charlie';
        const locationData = { latitude: 52.5075, longitude: 13.3904 };
        addMemory(userId, holidayId, title, locationData)
        setChange(true)
    }

    const changeMem = async (memoryId) => {
        await editMemory(userId, holidayId, memoryId, 'note', 'Its lovely')
        setChange(true)
    }

    const delMem = async (memoryId) => {
        await removeMemory(userId, holidayId, memoryId)
        setChange(true)
    }

    return (
        <View>
            {memories.map((memory) => {
                return (
                <View>
                    <Text>{memory.title} - {dateChanger(memory.date)} - {memory.note ? memory.note : 'noinfo'}</Text>
                    {/* {console.log(memory.locationData.latitude)} */}
                    <Button onPress={() => changeMem(memory.id)} title="change memory"></Button>
                    <Button onPress={() => delMem(memory.id)} title="delete memory"></Button>
                </View>
                );
            })}
            <Button onPress={newMemory} title="new memory"></Button>
        </View>
    )
}