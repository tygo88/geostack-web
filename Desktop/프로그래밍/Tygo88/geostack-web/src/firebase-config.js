// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv0n5kUbpsaWxC-p7mbnA2yKvUFevf3LE",
  authDomain: "geostack-13597.firebaseapp.com",
  projectId: "geostack-13597",
  storageBucket: "geostack-13597.firebasestorage.app",
  messagingSenderId: "334529385443",
  appId: "1:334529385443:web:61a993964a9f56e21446d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 다른 파일에서 쓸 수 있도록 export
export default app;
