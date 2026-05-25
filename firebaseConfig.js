import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    // Try popup first (works on desktop)
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    if (error.code === "auth/popup-blocked") {
      // Fall back to redirect only if popup was actually blocked
      await signInWithRedirect(auth, provider);
      return null;
    }
    // For popup-closed-by-user or cancelled-popup-request, don't fall back
    // Just rethrow so the UI can handle it
    throw error;
  }
};

export const handleRedirectResult = () => getRedirectResult(auth);

export const signOutUser = async () => {
  return signOut(auth);
};
