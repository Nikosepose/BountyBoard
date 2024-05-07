// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvcO7aSQHc6pf6N70t4Aad8coZZ6B7n8Q",
    authDomain: "bountyboard-3a46d.firebaseapp.com",
    projectId: "bountyboard-3a46d",
    storageBucket: "bountyboard-3a46d.appspot.com",
    messagingSenderId: "510358046045",
    appId: "1:510358046045:web:58836b6f01a1ebbc7ad4b4",
    measurementId: "G-G2KKMK9H50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);



export { auth, db }