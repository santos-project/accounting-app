// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8J-eYgCUtszKz_XuVOY2uekuBsDq3KY8",
  authDomain: "accouting-app-de063.firebaseapp.com",
  projectId: "accouting-app-de063",
  storageBucket: "accouting-app-de063.appspot.com",
  messagingSenderId: "55531535825",
  appId: "1:55531535825:web:22a4e4fc6b8e31d92274f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
