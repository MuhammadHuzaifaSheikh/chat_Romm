import firebase from "firebase";
import 'firebase/firestore'
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyAP9S2zPfZFF1j3LSg8deJWZPpZuVjfi0A",
    authDomain: "handbook-24507.firebaseapp.com",
    projectId: "handbook-24507",
    storageBucket: "handbook-24507.appspot.com",
    messagingSenderId: "835965868063",
    appId: "1:835965868063:web:adbd57035beb5f40e05d2a",
    measurementId: "G-YGFS4K477V"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { firebase, storage as default };
