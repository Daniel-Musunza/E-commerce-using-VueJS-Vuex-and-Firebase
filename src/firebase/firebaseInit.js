import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxxxx"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { firestamp };
  export default firebaseApp.firestore();