import { db } from "../firebaseconfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const testRef = collection(db, "test-collection");
const usersRef = collection(db, "users");

const getFromDB = async (dbLocation) => {
  try {
    const { docs } = await getDocs(dbLocation);
    return docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const testFunc = async () => {
  try {
    const contents = await getDocs(testRef);
    const doc = contents.docs[0];
    return doc.data().test_field;
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async () => await getFromDB(usersRef);

export const getUserByName = async (username) => {
  try {
    const q = query(usersRef, where("username", "==", username));
    const { docs } = await getDocs(q);

    return docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
