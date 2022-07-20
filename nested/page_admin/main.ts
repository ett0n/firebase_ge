import { firebaseConfig } from "../../src/tspartials/firebaseconf";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, serverTimestamp, setDoc, doc, addDoc } from "firebase/firestore";
import { toggleHiddenFlex } from "../../src/tspartials/functions";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and firestore
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

//DOM VARIABLES IN index.html
const login = document.getElementById("login")!;
const logout = document.getElementById("logout")!;
const whenSignedIn = document.getElementById("whenSignedIn")!;
const whenSignedOut = document.getElementById("whenSignedOut")!;
const userDetails = document.getElementById("user-details")!;
const dataPrint = document.getElementById("dataprint")!;

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

logout?.addEventListener("click", (e) => {
  signOut(auth);
  toggleHiddenFlex(whenSignedIn);
  toggleHiddenFlex(whenSignedOut);
  userDetails.innerHTML = "";
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    toggleHiddenFlex(whenSignedIn);
    toggleHiddenFlex(whenSignedOut);
    userDetails.innerHTML = user.displayName!;
  } else {
    userDetails.innerHTML = "";
    location.replace("./../../");
  }
});

const querySnapshot = await getDocs(collection(db, "ge"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  console.log(doc.data().attempt);
});

const test = doc(db, "test/202124342");
function writeDocument() {
  const docData = {
    description: "Note GE, curiosite",
    note: 4,
    date: serverTimestamp(),
  };
  setDoc(test, docData);
}

writeDocument();

function addNewGe() {
  addDoc(collection(db, "ge"), {});
}
