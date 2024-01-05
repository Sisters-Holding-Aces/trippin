import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addHoliday, addMemory, editHoliday, holidayById, holidaysByUser, removeHoliday } from "../backendView";
import { timestampToDate } from "../utils";

export default BeHolidaysTest = () => {
  const [hols, setHols] = useState([]);
  const [holAdded, setHolAdded] = useState(false);

  const testUser = "JqijYB2RTXwLKi3bSWXX"

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
    addHoliday(testUser, 'Cape Town', { latitude: -33.9258, longitude: 18.4232 });
    setHolAdded(true)
  };

  const dateChanger = (dateObj) => {
    const newDate = timestampToDate(dateObj)
    return newDate.date
  }

  const changeHol = async (holId) => {
    await editHoliday(testUser, holId, 'info', 'Went Cape Town :)')
    setHolAdded(true)
  }

  const delHol = async (holId) => {
    await removeHoliday(testUser, holId)
    setHolAdded(true)
  }


  return (
    <View>
      <Text>User: </Text>
      {hols.map((hol) => {
        return (
          <View>
            <Text>{hol.title} - {dateChanger(hol.startDate)}</Text>
            <Text>{hol.info ? hol.info : 'noinfo'}</Text>
            {/* {console.log(hol.locationData.latitude)} */}
            <Button onPress={() => changeHol(hol.id)} title="change holiday"></Button>
            <Button onPress={() => delHol(hol.id)} title="delete holiday"></Button>
          </View>
        );
      })}
      <Button onPress={createHol} title="new holiday"></Button>
    </View>
  );
};
