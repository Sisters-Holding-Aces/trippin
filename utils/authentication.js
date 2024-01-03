import { auth } from "../firebaseconfig";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const createAccount = async (email, pass, username) => {
    const newUser = await createUserWithEmailAndPassword(auth, email, pass)
    await updateProfile(newUser.user, {displayName: username})
    // createUserDocument(myUserName)
}

export const logIn = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass)
}

export const logOut = async () => await signOut(auth)