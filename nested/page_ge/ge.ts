import { firebaseConfig } from "../../src/tspartials/firebaseconf";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, serverTimestamp, setDoc, doc, addDoc, query, where } from "firebase/firestore";
import { toggleHiddenFlex } from "../../src/tspartials/functions";
import Chart from "chart.js/auto";
import { Value } from "sass";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and firestore
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

//DOM VARIABLES IN ge.html
const login = document.getElementById("login")!;
const logout = document.getElementById("logout")!;
const whenSignedIn = document.getElementById("whenSignedIn")!;
const whenSignedOut = document.getElementById("whenSignedOut")!;
const userDetails = document.getElementById("user-details")!;
const chart = document.getElementById("myChart")!;

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
    getInfoGe(user);
  } else {
    location.replace("./../../");
  }
});

async function getInfoGe(user) {
  const q = query(collection(db, "ge"), where("user_id", "==", user.uid));
  const querySnapshot = await getDocs(q);
  //creating array to store all ge types from query
  let tabGeType = [];
  querySnapshot.forEach((doc) => {
    tabGeType.push(doc.data().ge_type); //error ts
  });
  getInfoGeType(tabGeType[0]);
}

async function getInfoGeType(ge) {
  let arrayQuestions = ["question1", "question2", "question3", "question4", "question5", "question6"];
  let tabTitres = [];
  for (let i = 0; i < arrayQuestions.length; i++) {
    const q = collection(db, "ge_type_col", ge, arrayQuestions[i]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().title !== undefined) {
        tabTitres.push(doc.data().title);
      }
    });
  }
  tabTitres.forEach((e) => {
    console.log(e);
  });
  console.log(tabTitres.length);
  printChart(tabTitres);
}
function printChart(titres) {
  const data = {
    labels: [titres[0], titres[1], titres[3], titres[4], titres[5]],
    datasets: [
      {
        label: "First frontend GE",
        data: [4, 2, 3, 1, 3, 4],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
    },
  };
  const myChart = new Chart(chart, config);
}
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
