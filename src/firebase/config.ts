import firebase from "firebase/app";
import "firebase/auth";
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN_ID,
  appId: process.env.REACT_APP_ID
};
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) }
export default firebase;