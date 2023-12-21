// Import the functions you need from the SDKs you need
import  { initializeApp, getReactNativePersistence} from "firebase/app"
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA97pPlse_ApuwjtnqaNK-uYVJxvFh0Mvk",
  authDomain: "cleanerapp-f2c54.firebaseapp.com",
  projectId: "cleanerapp-f2c54",
  storageBucket: "cleanerapp-f2c54.appspot.com",
  messagingSenderId: "924572041909",
  appId: "1:924572041909:web:36620cb5b169fc3d7af4fc",
  measurementId: "G-M66JYXYMLG"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const analytics = getAnalytics(FIREBASE_APP);


