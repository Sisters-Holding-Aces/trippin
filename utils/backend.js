import { db } from "../firebaseconfig";
import { collection, getDocs, doc, getDoc, query, where, addDoc } from "firebase/firestore";

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

export const getUserByName = async (username) => {
    try {
        const q = query(usersRef, where('username', '==', username))
        const {docs} = await getDocs(q)
    
        return docs.map((doc) => ({
            ...doc.data()
        }))
    } catch (err){
        console.log(err)
    }
}

export const postUser = async (username) => {
    await addDoc(usersRef, {username: username})
}