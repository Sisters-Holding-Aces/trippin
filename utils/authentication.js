import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getUserByName, postUser } from "./backend";



export const createAccount = async (email, pass, username) => {
    
    const existingUser = await getUserByName(username)
    if (existingUser.length === 0){
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, pass)
            await updateProfile(newUser.user, {displayName: username})
            postUser(username)
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log('username taken')
    }
}

export const logIn = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass)
}

export const logOut = async () => await signOut(auth)