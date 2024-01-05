import { auth } from "../../firebaseconfig";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { deleteUserDoc, getUserByName, postUser } from "./backendUsers";

export const createAccount = async (email, pass, username) => {
  if (!auth.currentUser) {
    const existingUser = await getUserByName(username);
    if (!existingUser) {
      try {
        const newUser = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(newUser.user, { displayName: username });
        postUser(username, newUser.user.email);
        return "user created";
      } catch (err) {
        return err;
      }
    } else {
      return "username taken";
    }
  } else {
    return "user is logged in";
  }
};

export const logIn = async (email, pass) => {
  if (!auth.currentUser) {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return "user successfully logged in";
    } catch (err) {
      return err;
    }
  } else {
    return "user is logged in";
  }
};

export const logOut = async () => await signOut(auth);

export const removeUser = async () => {
  let user = auth?.currentUser;
  try {
    const userID = await getUserByName(auth.currentUser.displayName);
    await deleteUser(user);
    await deleteUserDoc(userID.id);
    return "user deleted";
  } catch (err) {
    return err;
  }
};

export const signedInUser = (bool) => {
  if (bool === 'bool') {
    if (auth?.currentUser) return true
    else return false
  } else if (auth?.currentUser) {
    return auth?.currentUser
  } else return {msg: 'No current user'}
}
