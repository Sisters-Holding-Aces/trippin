import { useEffect, useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HolidaysScreen from "./screens/HolidaysScreen";

export default function MainContainer({ user, setUser, setUserLoggedIn }) {
  const HomeRoute = () => <HomeScreen />;
  const ProfileRoute = () => (
    <ProfileScreen
      user={user}
      setUser={setUser}
      setUserLoggedIn={setUserLoggedIn}
    />
  );
  const HolidaysRoute = () => <HolidaysScreen />;

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  useEffect(() => {
    if (user) {
      setRoutes([
        {
          key: "home",
          title: "Home",
          focusedIcon: "home",
          unfocusedIcon: "home-outline",
        },
        {
          key: "holidays",
          title: "My Trips",
          focusedIcon: "airplane",
          unfocusedIcon: "account-outline",
        },
        {
          key: "profile",
          title: "Profile",
          focusedIcon: "account",
          unfocusedIcon: "account-outline",
        },
      ]);
    } else {
      setRoutes([
        {
          key: "home",
          title: "Home",
          focusedIcon: "home",
          unfocusedIcon: "home-outline",
        },
        {
          key: "profile",
          title: "Profile",
          focusedIcon: "account",
          unfocusedIcon: "account-outline",
        },
      ]);
      setIndex(1);
    }
    console.log(index);
  }, [user]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    holidays: HolidaysRoute,
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
