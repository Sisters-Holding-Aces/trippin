import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addHoliday, addMemory, editHoliday, holidayById, holidaysByUser, removeHoliday } from "../backendView";
import { timestampToDate } from "../utils";

export default BeHolidaysTest = () => {
  const [hols, setHols] = useState([]);
  const [holAdded, setHolAdded] = useState(false);

  const testUser = "TxiSR8vZCwWwln2WdENh"

  useEffect(() => {
    holidaysByUser(testUser).then((res) => {
      setHols(res);
    });
    // holidayById(testUser, 'uNFhKPtp3HT3taCJJZRg').then((res) => {
    //     console.log(res)
    // })
    setHolAdded(false)
  }, [holAdded]);

  const createHol = () => {
    const title = 'Paris';
    const location = { latitude: 48.8566, longitude: 2.3522 };
    addHoliday(testUser, title, location).then((res) => {
      console.log(res)
    });
    setHolAdded(true)
  };

  const dateChanger = (dateObj) => {
    const newDate = timestampToDate(dateObj)
    return newDate.date
  }

  const changeHol = async (holId) => {
    const testInput = "2021-01-05T12:30:45.678Z"
    await editHoliday(testUser, holId, 'info', 'date works2').then((res) => {
      console.log(res)
    })
    setHolAdded(true)
  }

  const delHol = async (holId) => {
    await removeHoliday(testUser, holId).then((res) => {
      console.log(res)
    })
    setHolAdded(true)
  }


  return (
    <View>
      <Text>User: </Text>
      {hols.map((hol) => {
        return (
          <View>
            <Text>{hol.title} - {dateChanger(hol.startDate)}</Text>
            {/* <Text>{dateChanger(hol.startDate)}</Text> */}
            <Text>{hol.info ? hol.info : 'noinfo'}</Text>
            {/* <Text>{hol.locationData.latitude}-{hol.locationData.longitude}</Text> */}
            <Button onPress={() => changeHol(hol.id)} title="change holiday"></Button>
            <Button onPress={() => delHol(hol.id)} title="delete holiday"></Button>
          </View>
        );
      })}
      <Button onPress={createHol} title="new holiday"></Button>
    </View>
  );
};
