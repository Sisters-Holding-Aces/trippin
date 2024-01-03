import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAJZTM05LRzQOYCCQWZPs9QD3YaoAaRId4",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "trippin-ed778.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "trippin-ed778",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "trippin-ed778.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "997067009957",
  appId: process.env.FIREBASE_APP_ID || "1:997067009957:web:bc6c66599726ed40ca024c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
