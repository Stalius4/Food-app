import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0J_8zQnA0QbmZHSvzXZvaeTeGLD04mls",
  authDomain: "food-app-78f5f.firebaseapp.com",
  projectId: "food-app-78f5f",
  storageBucket: "food-app-78f5f.appspot.com",
  messagingSenderId: "75616827073",
  appId: "1:75616827073:web:d860cbf0f075e143cc0640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);