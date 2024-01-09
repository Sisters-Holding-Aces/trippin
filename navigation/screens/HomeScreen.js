import { Text, View } from "react-native";
import MapWithPopups from "../../components/maps/MapWithPopups";
import { getUserInfo, memoriesByHoliday } from "../../utils/backendView";
import { useEffect, useState, useRef } from "react";
import { getHolidays } from "../../utils/controllers/backendHolidays";
import dummyData from "../../components/maps/dummyData";

export default function HomeScreen({ user }) {
  const [holidays, setHolidays] = useState([]);
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = useRef(null);

  useEffect(() => {
    if (user) {
      getUserInfo(user.displayName)
        .then(({ id }) => {
          userId.current = id;
          return getHolidays(userId.current);
        })
        .then((userHolidays) => {
          setHolidays(userHolidays);

          const memoryPromises = userHolidays.map((holiday) => memoriesByHoliday(userId.current, holiday.id));
          return Promise.all(memoryPromises);
        })
        .then((memories) => {
          setMemories(memories.flat());
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setHolidays(dummyData.holidays);
      setMemories(dummyData.memories);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {isLoading ? <Text>Loading...</Text> : <MapWithPopups holidays={holidays} memories={memories} />}
      </View>
    </>
  );
}
