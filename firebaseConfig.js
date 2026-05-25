import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDe8U7apEE2Jx713qetmIG4kb99s5GH79o",
  authDomain: "calmcove.vercel.app",
  projectId: "mental-health-chat-62ac6",
  storageBucket: "mental-health-chat-62ac6.firebasestorage.app",
  messagingSenderId: "440860208429",
  appId: "1:440860208429:web:bd5ec004a465a9c410b7a4",
  measurementId: "G-VBNNBMTDK0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  // Use redirect-based auth — most reliable for Vercel deployments
  await signInWithRedirect(auth, provider);
};

export const handleRedirectResult = () => getRedirectResult(auth);

export const signOutUser = async () => {
  return signOut(auth);
};
