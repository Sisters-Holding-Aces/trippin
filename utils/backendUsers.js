import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const usersRef = collection(db, "users");

export const getUsers = async () => {
  try {
    const { docs } = await getDocs(usersRef);
    return docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    return err;
  }
};

export const getUserByName = async (username) => {
  try {
    const q = query(usersRef, where("username", "==", username));
    const { docs } = await getDocs(q);

    return docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))[0];
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (username, email) => {
  await addDoc(usersRef, { username: username, email: email });
};

export const patchUser = async (field, input, userId) => {
  const docRef = doc(db, "users", userId);
  const data = { [field]: input };
  await updateDoc(docRef, data);
};

export const deleteUserDoc = async (userId) => {
  const docRef = doc(db, "users", userId);
  await deleteDoc(docRef);
};
