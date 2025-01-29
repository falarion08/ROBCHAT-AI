// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYaMyJQ_nc40uUHV68MiMr7bcr775Uq4c",
  authDomain: "chatbot-ai-d4911.firebaseapp.com",
  projectId: "chatbot-ai-d4911",
  storageBucket: "chatbot-ai-d4911.firebasestorage.app",
  messagingSenderId: "651546962485",
  appId: "1:651546962485:web:125f5bd34a07c1f6ccdf7c",
  measurementId: "G-JQNCWL2E5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app); 



