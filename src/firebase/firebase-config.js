import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBKocmkNxg1f3RiWASm0PVQ3PwUxmU1ntM",
    authDomain: "fir-5a79b.firebaseapp.com",
    databaseURL: "https://fir-5a79b.firebaseio.com",
    projectId: "fir-5a79b",
    storageBucket: "fir-5a79b.appspot.com",
    messagingSenderId: "850096472661",
    appId: "1:850096472661:web:38f18b3a6bef8c464f4adc"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}
