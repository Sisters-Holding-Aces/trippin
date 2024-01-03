import { Button, StyleSheet, Text, View } from "react-native";
import { testFunc, getUsers, getUserInfo } from "./backend";
import { useEffect, useState } from "react";
import { createAccount, logIn, logOut } from "./authentication";
import { auth } from "../firebaseconfig";


export default BackendTest = () => {
    const [allUsers, setAllUsers] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [logInOut, setLogInOut] = useState(false)

    useEffect(() => {
        getUsers().then(res => setAllUsers(res))
        getUserInfo('RKeEweJmC96pOoZEmzQn').then((res) => {
            setUserInfo(res)
        })
    }, [])

    useEffect(() => {
        setLogInOut(false)
    }, [logInOut])

    const signUp = async () => {
        await createAccount('abc@def.com', 'pass345', 'Greg2000')
        setLogInOut(true)
    }

    const signIn = async () => {
        await logIn('hello@hello.com', 'pass123')
        setLogInOut(true)
    }

    const signOut = async () => {
        await logOut()
        setLogInOut(true)
    }

    return (
        <View>
            <Text>BE working...</Text>
            {allUsers.length === 1 ? <Text>{allUsers[0].username}</Text> : <Text>Bad</Text>}
            <Button onPress={signUp} title="newUser"></Button>
            <Button onPress={signIn} title="login"></Button>
            <Text>User: {auth?.currentUser?.displayName}</Text>
            <Button onPress={signOut} title="logOut"></Button>
        </View>
    )
}