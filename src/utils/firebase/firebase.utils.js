import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWG4IgX9EMuR7HwrSUVefcroToI7Z2GuY",
    authDomain: "react-shop-db-fba13.firebaseapp.com",
    projectId: "react-shop-db-fba13",
    storageBucket: "react-shop-db-fba13.appspot.com",
    messagingSenderId: "974576559881",
    appId: "1:974576559881:web:c4e5f2abdad5b8032855d8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);