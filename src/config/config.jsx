import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByMkl5kmmO_TH-qZ97MvEX_3jA4E_6NgE",
  authDomain: "soulbook-6b850.firebaseapp.com",
  databaseURL: "https://soulbook-6b850.firebaseio.com",
  projectId: "soulbook-6b850",
  storageBucket: "soulbook-6b850.appspot.com",
  messagingSenderId: "549004567536",
  appId: "1:549004567536:web:04a623235b84be2394f335",
  measurementId: "G-QQEJD73G70"
};

const fb = firebase.initializeApp(firebaseConfig);
export default fb;
