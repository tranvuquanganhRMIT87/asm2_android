// Import the functions you need from the SDKs you need
import  { initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY29t4ZXfknZ8EnIFUkL2qfhkrSwMXDRc",
  authDomain: "asm2androidcourse.firebaseapp.com",
  projectId: "asm2androidcourse",
  storageBucket: "asm2androidcourse.appspot.com",
  messagingSenderId: "141711899944",
  appId: "1:141711899944:web:083e44495df123bd38241d",
  measurementId: "G-QSB7LER93S"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const analytics = getAnalytics(FIREBASE_APP);


