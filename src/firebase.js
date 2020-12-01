// from https://firebase.google.com/docs/web/setup#using-module-bundlers
// and https://github.com/HackerYou/bootcamp-notes/blob/master/react-and-firebase/using-firebase-with-react.md

// import Firebase SDK from npm install firebase node package
// Core firebase SDK
import firebase from "firebase/app";
// Realtime database library
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAhusalV2PNOkZTGMJoF5jEdG6j1MyAwKQ",
    authDomain: "continuity-fdab5.firebaseapp.com",
    databaseURL: "https://continuity-fdab5.firebaseio.com",
    projectId: "continuity-fdab5",
    storageBucket: "continuity-fdab5.appspot.com",
    messagingSenderId: "197882571705",
    appId: "1:197882571705:web:d4d032992e5d5e0d586468"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;