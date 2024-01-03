import { db } from "../firebaseconfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const testRef = collection(db, "test-collection");
const usersRef = collection(db, "users");


const getFromDB = async (dbLocation) => {
    try {
        const {docs} = await getDocs(dbLocation)
        return docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
    } catch (err) {
        console.error(err);
    }
}


export const testFunc = async () => {
    try {
        const contents = await getDocs(testRef);
        const doc = contents.docs[0];
        return doc.data().test_field
    } catch (err) {
        console.error(err);
    }
}

export const getUsers = async () => await getFromDB(usersRef)

export const getUserInfo = async (userId) => {
    const docRef = doc(db, 'users', userId)
    try {
        const userInfo = await getDoc(docRef)
        return userInfo.data()
    } catch (err) {
        console.log(err)
    }
}