import { db } from "../firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

const testRef = collection(db, "test-collection");

export const testFunc = async () => {
    try {
        const contents = await getDocs(testRef);
        const doc = contents.docs[0];
        return doc.data().test_field
    } catch (err) {
        console.error(err);
    }
}