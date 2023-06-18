
import './App.css';
import {
  signOut,
} from "firebase/auth";
import { Auth, } from './components/auth';
import {db, auth} from "./config/firebase"
import { useEffect, useState } from 'react';
import { getDoc, getDocs, collection} from 'firebase/firestore';
import Cookies from 'universal-cookie';
import ProfilePage from './components/profilePage';



const cookies =new Cookies()


function App() {
//to check if comeone is logged in
const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

const [id, setId] = useState("")
const [ingr, setIngr] = useState ([])


  // Reference to the "testas" collection in Firestore
const ingrCollectionRef = collection(db, "testas")


useEffect(() => {
  const getIngr = async () => {

    try {
       // Get all documents from the "testas" collection
      const data = await getDocs(ingrCollectionRef)

       // Extract the data and add an "id" property to each document
      const filtData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,

      }));
 
    } catch (error) {
      console.error(error)
    }


  }
  getIngr()
}, [])

const logout = async () => {
  try {
    await signOut(auth);
    setIsAuth(cookies.remove("auth-token"))
  } catch (err) {
    console.error(err);
  }
};

if(!isAuth){

  return (
    <div className="App">
<Auth isAuth= {isAuth} setIsAuth={setIsAuth} setId={setId}></Auth>

    </div>
  );
}

else {

  return (<div>
<ProfilePage setId={setId}></ProfilePage>
  <button className="button" onClick={logout}>Logout</button>
  </div>

  
  ) 
  
}   
}



export default App;
