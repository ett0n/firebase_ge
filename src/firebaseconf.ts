const login = document.getElementById("login");
const logout = document.getElementById("logout");
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const userDetails = document.getElementById("user-details");

console.log(login);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDh-LB3XEsH1hHYj2DQRYciS7t7UkaZVwM",
  authDomain: "radarcepegra.firebaseapp.com",
  projectId: "radarcepegra",
  storageBucket: "radarcepegra.appspot.com",
  messagingSenderId: "676093786790",
  appId: "1:676093786790:web:485e437b62bf42d0369267",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

if (login !== null) {
  login.addEventListener("click", (e) => {
    console.log("click");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
}

logout.addEventListener("click", (e) => {
  signOut(auth);
  toggleHiddenFlex(whenSignedIn);
  toggleHiddenFlex(whenSignedOut);
  userDetails.innerHTML = "";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    toggleHiddenFlex(whenSignedIn);
    toggleHiddenFlex(whenSignedOut);
    userDetails.innerHTML = user.displayName;
  } else {
    userDetails.innerHTML = "";
  }
});

function toggleHiddenFlex(domElement) {
  if (domElement.classList.contains("hidden")) {
    domElement.classList.remove("hidden");
    domElement.classList.add("flex");
  } else {
    domElement.classList.add("hidden");
    domElement.classList.remove("flex");
  }
}
