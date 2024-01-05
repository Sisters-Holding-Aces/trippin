import { GeoPoint, Timestamp, collection, getDocs, query, where } from "@firebase/firestore"
import { db } from "../../firebaseconfig";

export const titleCheck = async (userId, title) => {
    const holidayRef = collection(db, "users", userId, "holidays");
    const q = query(holidayRef, where('title', '==', title))

    const {docs} = await getDocs(q)
    const testArr =  docs.map((doc) => ({
        ...doc.data()
    }))
    return testArr.length === 0
}

export const locationChecker = async (location) => {
    let currentLocation
    try {
        currentLocation = new GeoPoint(location.latitude, location.longitude);
    } catch (err) {
        return false
    }
    return currentLocation ? true : false
}

export const dateValidator = async (input) => {
    const inputDate = new Date(input)
    const iso = Timestamp.fromDate(inputDate)
    if (typeof iso.nanoseconds === 'number' && typeof iso.seconds === 'number') {
        return true
    } else return false
}
