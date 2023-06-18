import React from "react";
import "./profile.css";
import { collection, addDoc } from "firebase/firestore"; 
import {db, auth} from "../config/firebase.js"

import { useState } from "react";






const ProfilePage = ({setId}) => {





  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');









const handleInputChange = async (e) => {
  try {
    const docRef = await addDoc(collection(db, "users", setId ), {
      first: name,
      last: surname,
      
    });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="surnameInput">Surname:</label>
        <input
          id="surnameInput"
          type="text"
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