import { db, auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Cookies from "universal-cookie";
import { useState } from "react";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import {useDispatch} from "react-redux"
import {setUserId} from "./features/users"


import "./auth.css"; // Import the CSS file

const cookies = new Cookies();

export const Auth = ({ isAuth, setIsAuth, setId, id }) => {
const dispatch = useDispatch()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {

      const result = await signInWithPopup(auth, googleProvider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(cookies.get("auth-token"));
    



      const customId = result.user.uid; // Specify your custom document ID

      const docRef = doc(db, "users", customId); // Use the custom ID for the document reference
      const docSnap = await getDoc(docRef);
      dispatch(setUserId({
        id:customId, //taking users Id from auth and storing to redux state 
        first: docSnap.data().first, // taking data from user collection and storing in redux state
        last:docSnap.data().last
      }
      )
      )



console.log(docSnap.data().first, "docksnap")


      if (docSnap.exists()) {
        console.log("Document already exists: ", docRef.id);
      } else {
        await setDoc(docRef, {
         
          email:result.user.email,
          first:"",
          last:"",
        });
        console.log("Document created with ID: ", docRef.id);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
    <input
      className="input-field"
      placeholder="Email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      className="input-field"
      placeholder="Password..."
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="button" onClick={signIn}>Sign In</button>

    <button className="button" onClick={signInWithGoogle}>Sign In With Google</button>

    <button className="button" onClick={logout}>Logout</button>
  </div>
  );
};