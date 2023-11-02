// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC1PVRnHIMdR0y1ECVv-xV0favSxpHvluo",
  authDomain: "dshop-9372d.firebaseapp.com",
  projectId: "dshop-9372d",
  storageBucket: "dshop-9372d.appspot.com",
  messagingSenderId: "121416556324",
  appId: "1:121416556324:web:7b201e7775386a3da39db1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app