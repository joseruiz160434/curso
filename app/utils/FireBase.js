import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyA9dhtf8WaxNHxDBOSTZDwFSbKYaBLDVWc",
  authDomain: "tenedores-6dbfe.firebaseapp.com",
  databaseURL: "https://tenedores-6dbfe.firebaseio.com",
  projectId: "tenedores-6dbfe",
  storageBucket: "tenedores-6dbfe.appspot.com",
  messagingSenderId: "875751325834",
  appId: "1:875751325834:web:a1c8eb579b64b4f231ad73"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
