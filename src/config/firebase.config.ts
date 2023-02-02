import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyAJJWHQ2SGG4oO3C3VE_G0vRIioY43tZes",
	authDomain: "react-fire-a08c0.firebaseapp.com",
	projectId: "react-fire-a08c0",
	storageBucket: "react-fire-a08c0.appspot.com",
	messagingSenderId: "293649321585",
	appId: "1:293649321585:web:779ded08cad7a36e7b95d0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);
export { db, auth, googleProvider, storage };
