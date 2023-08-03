import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

  // Instantiate db
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    //if user data exists, return userDocRef
    // if user data does NOT exist, create/set the data into the collection.

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt})
        } catch (error) {
            console.log("Error creating the user", error.message)
        }
    }

    return userDocRef;
  }