import firebase from "firebase"; 

const firebaseConfig = {
    apiKey: "AIzaSyDyG3svUBTTKYqzGOV3C_Zew57GzG9bUx8",
    authDomain: "clone-488b8.firebaseapp.com",
    projectId: "clone-488b8",
    storageBucket: "clone-488b8.appspot.com",
    messagingSenderId: "1073536965377",
    appId: "1:1073536965377:web:1c6719d2a732f2826dd900"
  };
  const app=!firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app();
  const db=app.firestore();
  export default db;