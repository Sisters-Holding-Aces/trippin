import { Button, StyleSheet, Text, View } from "react-native";
import { testFunc, getUsers, getUserInfo, getUserByName } from "./backend";
import { useEffect, useState } from "react";
import { createAccount, logIn, logOut } from "./authentication";
import { auth } from "../firebaseconfig";


export default BackendTest = () => {
    const [allUsers, setAllUsers] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [logInOut, setLogInOut] = useState(false)

    useEffect(() => {
        getUsers().then(res => setAllUsers(res))
        getUserByName('example2').then((res) => {
            setUserInfo(res[0])
        })
    }, [])

    useEffect(() => {
        setLogInOut(false)
    }, [logInOut])

    const signUp = async () => {
        await createAccount('abcdefg@def.com', 'pass345', 'example2')
        setLogInOut(true)
    }

    const signIn = async () => {
        await logIn('abcdefg@def.com', 'pass345')
        setLogInOut(true)
    }

    const signOut = async () => {
        await logOut()
        setUserInfo({})
        setLogInOut(true)
    }

    const viewUser = () => {
        if (userInfo.username) {
            return (
                <View>
                    <Text>{userInfo.username}</Text>
                    {userInfo.bio ? <Text>{userInfo.bio}</Text> : <Text>No Bio</Text>}
                    {userInfo.avatar ? <Text>{userInfo.avatar}</Text> : <Text>No avatar</Text>}
                </View>
            )
        } else {
            return (
                <Text>No active user</Text>
            )
        }
    }

    return (
        <View>
            <Text>BE working...</Text>
            {viewUser()}
            <Button onPress={signUp} title="newUser"></Button>
            <Button onPress={signIn} title="login"></Button>
            <Text>User: {auth?.currentUser?.displayName}</Text>
            <Button onPress={signOut} title="logOut"></Button>
        </View>
    )
}