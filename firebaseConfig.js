import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe8U7apEE2Jx713qetmIG4kb99s5GH79o",
  authDomain: "mental-health-chat-62ac6.firebaseapp.com",
  projectId: "mental-health-chat-62ac6",
  storageBucket: "mental-health-chat-62ac6.firebasestorage.app",
  messagingSenderId: "440860208429",
  appId: "1:440860208429:web:bd5ec004a465a9c410b7a4",
  measurementId: "G-VBNNBMTDK0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const anonymousLogin = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Signed in anonymously", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Anonymous auth error:", error);
    throw error;
  }
};

export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log("Signed in with Google", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Google auth error:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  return signOut(auth);
};
