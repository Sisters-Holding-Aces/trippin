import { StyleSheet, View } from "react-native";
import MapWithPopups from "../../components/maps/MapWithPopups";
import { ToggleButton } from "react-native-paper";
import { getUserInfo, memoriesByHoliday } from "../../utils/backendView";
import { useEffect, useState, useRef } from "react";
import { getHolidays } from "../../utils/controllers/backendHolidays";
import dummyData from "../../components/maps/dummyData";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export default function HomeScreen({ user }) {
  const [holidays, setHolidays] = useState([]);
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState(false);

  const onButtonToggle = (value) => {
    setStatus(status === "checked" ? "unchecked" : "checked");
  };

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
        {isLoading ? (
          <ActivityIndicator animating={true} color={MD2Colors.blueGrey100} size={"large"} />
        ) : (
          <>
            <ToggleButton
              style={styles.IconButton}
              size={40}
              icon="earth-plus"
              iconColor="blue"
              value="add-trip"
              status={status}
              onPress={onButtonToggle}
            />
            <MapWithPopups holidays={holidays} memories={memories} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  IconButton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: "5%",
    right: "10%",
    zIndex: 1,
  },
});
