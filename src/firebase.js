import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANmsEUokBQsmhHaC3vv-lnaJHDLGgWWP4",
    authDomain: "fluffy-landing.firebaseapp.com",
    projectId: "fluffy-landing",
    storageBucket: "fluffy-landing.firebasestorage.app",
    messagingSenderId: "1012634706727",
    appId: "1:1012634706727:web:bd123f58cf78c72c993f02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
