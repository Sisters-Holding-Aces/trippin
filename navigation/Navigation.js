import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Feed from './screens/Feed';
import MapWithPopups from '../components/maps/MapWithPopups';
import HomeScreen from './screens/HomeScreen';
import AllHols from './screens/homeStack/AllHols';
import AllHolidaysScreen from './screens/AllHolidaysScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackGroup () {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Feed' component={Feed} />
            <HomeStack.Screen name='Hols' component={HomeScreen} />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function TabGroup () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStackGroup" component={HomeStackGroup} options={{headerShown: false}} />
            <Tab.Screen name="Feed2" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default function Navigation () {
    return (

        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
}