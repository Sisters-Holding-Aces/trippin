import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { addHoliday, holidayById, holidaysByUser } from "../backendView";

export default BeHolidaysTest = () => {
  const [hols, setHols] = useState([]);

  useEffect(() => {
    holidaysByUser("JqijYB2RTXwLKi3bSWXX").then((res) => {
      setHols(res);
    });
    // holidayById('RKeEweJmC96pOoZEmzQn', 'n0nzH7o7Y05e86nUwA8A').then((res) => {
    //     console.log(res)
    // })
  }, []);

  const createHol = () => {
    addHoliday("JqijYB2RTXwLKi3bSWXX", "Tokyo", {
      latitude: 35.6894875,
      longitude: 139.6917064,
    });
  };

  return (
    <View>
      <Text>User: </Text>
      {hols.map((hol) => {
        return (
          <View>
            <Text>{hol.title}</Text>
            {/* {console.log(hol.locationData)} */}
          </View>
        );
      })}
      <Button onPress={createHol} title="creathol"></Button>
    </View>
  );
};
