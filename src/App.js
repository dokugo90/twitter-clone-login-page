import { useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  Firestore,
  getDoc,
  where,
  aggregateQuerySnapshotEqual,
} from 'firebase/firestore';
import SignUpPage from "./signup";
import { LoginPage } from "./signup";
import { Routes, Route } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBN5LGaBrvsiftq4CIIlai063FqV2j2ZS4",
  authDomain: "fir-b9842.firebaseapp.com",
  projectId: "fir-b9842",
  storageBucket: "fir-b9842.appspot.com",
  messagingSenderId: "301078858614",
  appId: "1:301078858614:web:02c59b5e5697ac9120c857"
};

/*function App() {

  let username = useRef("Sign in");
  const [profilePic, setProfilePic] = useState("https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")
  const texter = useRef("")
  let isSignedIn = useRef()
  let userMail = useRef("")

  function Authentication() {

    this.signIn = async function() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    //setUsername(getAuth().currentUser.displayName)
    username.current = getAuth().currentUser.displayName;
    setProfilePic(getAuth().currentUser.photoURL)
    isSignedIn.current = true
    userMail.current = new UserProfile().getEmail();
    };

    this.signOut = function() {
    signOut(getAuth())
    isSignedIn.current = false;
    };
  }

  function UserProfile() {
    this.getUserName = function() {
      return getAuth().currentUser.displayName;
    };
    this.getProfilePicUrl = function() {
      return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
    };
    this.getEmail = function() {
      return getAuth().currentUser.email;
    };
  }

  /*async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    setUsername(getAuth().currentUser.displayName)
    setProfilePic(getAuth().currentUser.photoURL)
  }*/

  /*function isUserSignedIn() {
    return !!getAuth().currentUser.displayName;
  }
  
  window.addEventListener("load", () => {
   // setUsername(getAuth().currentUser.displayName)
    setProfilePic(getAuth().currentUser.photoURL)
  })

  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), renderUser);
  }

  /*function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
  }*/
  
  // Returns the signed-in user's display name.
  /*function getUserName() {
    return getAuth().currentUser.displayName;
  }

  function getEmail() {
    return getAuth().currentUser.email;
  }*/

  /*function renderUser() {
    if (isUserSignedIn()) {
     //setUsername(getUserName());
     username.current = new UserProfile().getUserName()
     setProfilePic(new UserProfile().getProfilePicUrl()); 
     isSignedIn.current = true
     userMail.current = new UserProfile().getEmail()
    } else {
      //setUsername("Sign In");
      username.current = "Sign In"
      setProfilePic("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png")
      isSignedIn.current = false;
      userMail.current = new UserProfile().getEmail()
    }
   }

   function textMessage(e) {
      texter.current = e;
   }

   function backendFunction() {
    this.sendUserMessage = async function() {
      if (isUserSignedIn()) {
        try {
          await addDoc(collection(getFirestore(), 'message'), {
            name: new UserProfile().getUserName(),
            userEmail: new UserProfile().getEmail(),
            userText: texter.current,
            timestamp: serverTimestamp()
          })
        } catch(err) {
          alert(err)
        }
      } else {
        return
      }
     };
     this.readUserMessage = async function() {
        const search = query(collection(getFirestore(), 'message'))

        onSnapshot(search, function(snapshot) {
          snapshot.docChanges().forEach((e) => {
              console.log(e.doc.data().userText)
          })
        })
     }
   }

  /*async function sendUserMessage() {
    try {
      await addDoc(collection(getFirestore(), 'message'), {
        name: new UserProfile().getUserName(),
        userEmail: new UserProfile().getEmail(),
        userText: texter.current,
        timestamp: serverTimestamp()
      })
    } catch(err) {
      alert(err)
    }
   }*/

  /*initFirebaseAuth()

  return (
    <>
    <textarea onChange={(e) => textMessage(e.target.value)}></textarea>
    <button onClick={() => new backendFunction().sendUserMessage()}>Send</button>
    {
      !isSignedIn.current ?
      <>
      <button onClick={() => new Authentication().signIn()}>Sign In</button>
      <br />
      </>
      : 
      <>
      <button onClick={() => new Authentication().signOut()}>Sign Out</button>
      <br />
      </>
    }
    <h3>
      {
      isSignedIn.current ?
      username.current
      : "Sign In"
      }</h3>
    <img className="image" src={profilePic}></img>
    <h3>{userMail.current}</h3>
    <h1>Hello, {username.current}</h1>
    </>
  );
}*/

function App() {
  return (
     <>
     <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/" element={<SignUpPage />}/>
     </Routes>
     </>
  )
}


initializeApp(firebaseConfig);


export default App;
