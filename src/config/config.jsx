import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7O9OEz53uIaKeTJiuPwTZ9-HgiJo73mk",
  authDomain: "tkasoulbook.firebaseapp.com",
  databaseURL: "https://tkasoulbook.firebaseio.com",
  projectId: "tkasoulbook",
  storageBucket: "tkasoulbook.appspot.com",
  messagingSenderId: "30198350438",
  appId: "1:30198350438:web:669b72d195d90c6914e3a7",
  measurementId: "G-8QS5F47563",
};

const fb = firebase.initializeApp(firebaseConfig);
export default fb;
