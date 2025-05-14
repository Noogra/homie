// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5U3M2kb93AIQiKT6yi4L2GGo4wVDVNwY",
  authDomain: "homie-27135.firebaseapp.com",
  projectId: "homie-27135",
  storageBucket: "homie-27135.firebasestorage.app",
  messagingSenderId: "87885698772",
  appId: "1:87885698772:web:d175d1c216c436fe27cd41",
  measurementId: "G-9HBPY6RLZY",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
