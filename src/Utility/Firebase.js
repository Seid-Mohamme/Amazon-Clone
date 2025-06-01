// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
// import { getAuth } from "firebase/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEzaLbIVMHR1yTDk51HphI2QpZX_7gPf0",
  authDomain: "clone-d1763.firebaseapp.com",
  projectId: "clone-d1763",
  storageBucket: "clone-d1763.firebasestorage.app",
  messagingSenderId: "960655182145",
  appId: "1:960655182145:web:b33b17e5bebda0a393f9c0",
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = app.firestore();
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
