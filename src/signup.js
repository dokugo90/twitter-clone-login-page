import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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

import { TextField } from "@mui/material"
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBN5LGaBrvsiftq4CIIlai063FqV2j2ZS4",
  authDomain: "fir-b9842.firebaseapp.com",
  projectId: "fir-b9842",
  storageBucket: "fir-b9842.appspot.com",
  messagingSenderId: "301078858614",
  appId: "1:301078858614:web:02c59b5e5697ac9120c857"
};

function SignUpPage() {

  const [disable, setDisable] = useState(false)
  const [signedIn, hasSignedIn] = useState(false)

  const userName = useRef("");
  const userMail = useRef("");
  const userPassword = useRef();
  const confirm = useRef()
  const userData = useRef();
  const [passwordState, setPass] = useState("")
  const [confirmState, setConfirm] = useState("")
  const [nameState, setNameState] = useState("")
  const [emailState, setEmailState] = useState("")
  const timer = useRef(false);
  const [content, setContent] = useState("");
  const [navigate, shouldNav] = useState(false)
  document.title = "Twitter Clone Sign up"
  /*function Authentication() {

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
  }*/

  /*function UserProfile() {
    this.getUserName = function() {
      return getAuth().currentUser.displayName;
    };
    this.getProfilePicUrl = function() {
      return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
    };
    this.getEmail = function() {
      return getAuth().currentUser.email;
    };
  }*/

  /*async function signIn() {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
    setUsername(getAuth().currentUser.displayName)
    setProfilePic(getAuth().currentUser.photoURL)
  }*/

 /* function isUserSignedIn() {
    return !!getAuth().currentUser.displayName;
  }*/
  
  /*window.addEventListener("load", () => {
   // setUsername(getAuth().currentUser.displayName)
    setProfilePic(getAuth().currentUser.photoURL)
  })*/

  /*function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), renderUser);
  }*/

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
   }*/

   /*function textMessage(e) {
      texter.current = e;
   }*/

   /*function backendFunction() {
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
   }*/

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

  //initFirebaseAuth()

  /*useEffect(() => {
    if (password != "" && confirmPassword != "") {
      if (password == confirmPassword && password.length >= 6 && confirmPassword.length >= 6) {
        setDisable(false)
      } else {
        setDisable(true)
      }
    }
  }, [password, confirmPassword])*/

  async function createUser(e) {
    
      if (userPassword.current == confirm.current && userName.current != "" && userMail.current != "" && userName.current.length >= 6 && userMail.current.includes("@")) {
        createUserWithEmailAndPassword(getAuth(), userMail.current, confirm.current)
        .then((userCred) => {

          let userProd = userCred.user;
          console.log("Created")
          try {
            addDoc(collection(getFirestore(), userProd.email), {
              userAccount: userName.current,
              userEmail: userMail.current,
              timestamp: serverTimestamp()
            })
            setContent("Successfully created account")
            hasSignedIn(true)
            timer.current = true;
            shouldNav(true)
          } catch(err) {
            setContent("Error Creating Account")
            hasSignedIn(true)
            timer.current = true;
            shouldNav(false)
          }
        })
        .catch((err) => {
            alert(err)
        })
      } else {
        setContent("Enter all fields correctly")
            hasSignedIn(true)
            timer.current = true;
            shouldNav(false)
        return;
      }
      /*userName.current = "";
      setNameState(userName.current)
      userMail.current = "";
      setEmailState(userMail.current)
      userPassword.current = "";
      setPass(userPassword.current)
      confirm.current = "";
      setConfirm(confirm.current)*/
  }

  if (timer.current) {
    timer.current = setTimeout(() => {
      hasSignedIn(false)
      if (navigate) {
        window.location.href = "/twitter-clone-login-page/login"
      }
    }, 5000)
  } else {
    clearTimeout(timer.current)
  }

  return (
    <>
    <form action="#">
    <div id="Login-Container">
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="twitter-logo  svg-inline--fa fa-twitter fa-w-16 fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#1da1f2">
        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
    </svg>
    <h3 className="create-account">Create An Account</h3>
    
        <div className="username-textfield">
    <TextField placeholder="Minimum six characters" value={nameState} onInput={e => setNameState(e.target.value)} onChange={e => userName.current = e.target.value} type="text" id="outlined-basic" label="Username" variant="outlined" required/><br />
    <TextField value={emailState} onInput={e => setEmailState(e.target.value)} onChange={e => userMail.current = e.target.value} type="email" id="outlined-basic" label="Email Address" variant="outlined" required/><br />
    <TextField value={passwordState} onInput={e => setPass(e.target.value)} type="password" onChange={e => userPassword.current = e.target.value} id="outlined-basic" label="Password" variant="outlined" required/><br />
    <TextField value={confirmState} onInput={e => setConfirm(e.target.value)} onChange={e => confirm.current = e.target.value} type="password" id="outlined-basic" label="Confirm Password" variant="outlined" required/><br />
    </div>
    <input disabled={disable} type="button" className="sign-up" value="Sign up" onClick={e => createUser(e.target)}/>
    <p style={{fontWeight: 650, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
    {
      signedIn ?
      <>
      <div className="account-snackbar-flex">
      <div className="account-snackbar">
        <p>{content}</p>
      </div>
      </div>
      </>
      : null
    }
    </form>
    </>
  );
}

function LoginPage() {

  const userEmail = useRef();
  const userPass = useRef();
  const [signedIn, hasSignedIn] = useState(false)
  const [content, setContent] = useState("")
  const timer = useRef(false);

  document.title = "Twitter Clone Login";

  function getUser() {

    signInWithEmailAndPassword(getAuth(), userEmail.current, userPass.current)
    .then((userCred) => {

      const user = userCred.user;
      addDoc(collection(getFirestore(), user.email), {
        lastLogin: serverTimestamp()
      })
      setContent("Successfully Loged In")
      hasSignedIn(true)
      timer.current = true;
    }).catch((err) => {
      setContent("Incorrect Password or Email")
      hasSignedIn(true)
      timer.current = true;
    }) 
  }

  if (timer.current) {
    timer.current = setTimeout(() => {
      hasSignedIn(false)
    }, 5000)
  } else {
    clearTimeout(timer.current)
  }

  return (
    <>
    <form action="#">
    <div id="Login-Container">
    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="twitter-logo  svg-inline--fa fa-twitter fa-w-16 fa-2x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="#1da1f2">
        <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
    </svg>
    <h3 className="create-account">Log In</h3>
    
        <div className="username-textfield">
    <TextField onChange={e => userEmail.current = e.target.value} type="email" id="outlined-basic" label="Email Address" variant="outlined" required/><br />
    <TextField onChange={e => userPass.current = e.target.value} type="password" id="outlined-basic" label="Password" variant="outlined" required/><br />
    </div>
    <input type="button" className="sign-up" value="Log In" onClick={() => getUser()}/>
    <p style={{fontWeight: 650, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>Already have an account? <Link to="/">Sign up</Link></p>
    </div>
    {
      signedIn ?
      <>
      <div className="account-snackbar-flex">
      <div className="account-snackbar">
        <p>{content}</p>
      </div>
      </div>
      </>
      : null
    }
    </form>
    </>
  )
}


initializeApp(firebaseConfig);


export default SignUpPage;
export { LoginPage };
