import firebase from "firebase";
import 'firebase/firestore'
import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyBztGIwRWcxr0Nz1TN1wgV2G227aiMU5eY",
    authDomain: "chat-app-ae9bf.firebaseapp.com",
    projectId: "chat-app-ae9bf",
    storageBucket: "chat-app-ae9bf.appspot.com",
    messagingSenderId: "419059211329",
    appId: "1:419059211329:web:afbfa4ca002345ed90bac0",
    measurementId: "G-CNQ19M9JR8"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { firebase, storage as default };
