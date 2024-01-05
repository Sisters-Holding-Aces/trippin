import { db } from "../../firebaseconfig";
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
  Timestamp,
  GeoPoint,
} from "firebase/firestore";

export const getHolidays = async (userId) => {
  const holidayRef = collection(db, "users", userId, "holidays");
  try {
    const { docs } = await getDocs(holidayRef);
    return docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    return err;
  }
};

export const getHoliday = async (userId, holidayId) => {
  const docRef = doc(db, "users", userId, "holidays", holidayId);
  try {
    const docSnap = await getDoc(docRef);
    const holData = docSnap.data()
    if (holData) return holData;
    else return {msg: 'holiday not found'}
  } catch (err) {
    return err
  }
};

export const postHoliday = async (userId, title, location) => {
  const holidayRef = collection(db, "users", userId, "holidays");
  const currentDate = Timestamp.now();
  const currentLocation = new GeoPoint(location.latitude, location.longitude);
  const data = {
    title: title,
    locationData: currentLocation,
    startDate: currentDate,
  };
  
  await addDoc(holidayRef, data);
};

export const patchHoliday = async (userId, holidayId, field, input) => {
  const docRef = doc(db, "users", userId, "holidays", holidayId);
  const data = {[field]: input}
  await updateDoc(docRef, data);
}

export const deleteHoliday = async (userId, holidayId) => {
  const docRef = doc(db, "users", userId, "holidays", holidayId);
  await deleteDoc(docRef);
};