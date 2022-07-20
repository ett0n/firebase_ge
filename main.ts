import { firebaseConfig } from "./src/tspartials/firebaseconf";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//DOM VARIABLES IN index.html
const login = document.getElementById("login")!;

if (login !== null) {
  login.addEventListener("click", (e) => {
    console.log("click");
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.code);
        // ...
      });
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    location.replace("./nested/page_ge/ge.html");
  }
});
