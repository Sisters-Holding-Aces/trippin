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

export const getMemories = async (userId, holidayId) => {
    const memoryRef = collection(db, "users", userId, "holidays", holidayId, "memories");
    try {
        const { docs } = await getDocs(memoryRef);
        return docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      } catch (err) {
        return err;
      }
}

export const getMemory = async (userId, holidayId, memoryId) => {
    const docRef = doc(db, "users", userId, "holidays", holidayId, "memories", memoryId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const postMemory = async (userId, holidayId, title, location) => {
    const MemoryRef = collection(db, "users", userId, "holidays", holidayId, "memories");
    const currentDate = Timestamp.now();
    const currentLocation = new GeoPoint(location.latitude, location.longitude);
    const data = {
      title: title,
      locationData: currentLocation,
      date: currentDate,
    };
    await addDoc(MemoryRef, data);
  };