import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyD7Tc_Asec0wlVwtiNFJmd0R31aoq0ZiBo",
    authDomain: "the-online-boutique.firebaseapp.com",
    projectId: "the-online-boutique",
    storageBucket: "the-online-boutique.appspot.com",
    messagingSenderId: "623142084824",
    appId: "1:623142084824:web:90f6caa1fea0c2e69437ad"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { firestamp };
  export default firebaseApp.firestore();