import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AllHolidaysScreen from "./screens/AllHolidaysScreen";

export default function MainContainer({ user, setUser, setUserloggedin }) {
  const HomeRoute = () => <HomeScreen />;
  const ProfileRoute = () => (
    <ProfileScreen
      user={user}
      setUser={setUser}
      setUserloggedin={setUserloggedin}
    />
  );
  const AllHolidaysRoute = () => <AllHolidaysScreen user={user} />;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "allHolidays",
      title: "All holidays",
      focusedIcon: "view-list",
      unfocusedIcon: "view-list-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    allHolidays: AllHolidaysRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
