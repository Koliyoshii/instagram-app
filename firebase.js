// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWLszr8yV0J-WzaCJY86n-pzGxczegxzs",
  authDomain: "instagram-app-9c968.firebaseapp.com",
  projectId: "instagram-app-9c968",
  storageBucket: "instagram-app-9c968.appspot.com",
  messagingSenderId: "98308931442",
  appId: "1:98308931442:web:2d253f6a5d036fbb8e67eb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };