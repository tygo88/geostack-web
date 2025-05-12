// src/firebase-auth.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from './firebase-config';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
