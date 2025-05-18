import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB5U3M2kb93AIQiKT6yi4L2GGo4wVDVNwY",
  authDomain: "homie-27135.firebaseapp.com",
  projectId: "homie-27135",
  storageBucket: "homie-27135.appspot.com",
  messagingSenderId: "87885698772",
  appId: "1:87885698772:web:d175d1c216c436fe27cd41",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
