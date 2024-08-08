// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-next-js-431708.firebaseapp.com",
  projectId: "twitter-clone-next-js-431708",
  storageBucket: "twitter-clone-next-js-431708.appspot.com",
  messagingSenderId: "962473677336",
  appId: "1:962473677336:web:677256029409172a29296d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);