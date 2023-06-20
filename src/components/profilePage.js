import React from "react";
import "./profile.css";
import { getDoc,collection, addDoc , setDoc, doc, updateDoc} from "firebase/firestore"; 
import {db, auth} from "../config/firebase.js"
import { useSelector } from "react-redux";
import { useState } from "react";
import {useDispatch} from "react-redux"
import {setUserId} from "./features/users"





const ProfilePage = () => {

const user = useSelector((state) => state.userId.value)
const dispatch = useDispatch()


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');









const handleInputChange = async (e) => {
 
  e.preventDefault()
  try {


//Read user name and surnamefrom database and store in userData variable
//use it later for tenary operator in case is empty input 
    const userRef = await doc(db, "users", user.id); 
    const docSnap = await getDoc(userRef);
    const userData = {first:docSnap.data().first,
                      last:docSnap.data().last} 



//update  user name and surname to firebase database
    const docRef = await doc(db,"users",user.id );
    await updateDoc(docRef, {
      first: name ? name : userData.first,// if input is empty, checking users document in firestore and keeping the same data
      last: surname ? surname : userData.last
      
    }, { merge: true });
   
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
 
   
}

  }


  return (
    <div className="profile-container">
   <form onSubmit={handleInputChange}>
      <div>
        <label htmlFor="nameInput">Name:</label>
        <input
          id="nameInput"
          type="text"
          placeholder={user.first}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="surnameInput">Surname:</label>
        <input
          id="surnameInput"
          type="text"
          placeholder={user.last}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ProfilePage;