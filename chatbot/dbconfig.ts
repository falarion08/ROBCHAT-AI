// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DB_KEY,
  authDomain: process.env.DB_AUTHDOMAIN,
  projectId: process.env.DB_PROJECT_ID,
  storageBucket: process.env.DB_STORAGEBUCKET,
  messagingSenderId: String(process.env.DB_MESSAGING_SENDER_ID),
  appId: process.env.DB_APP_ID,
  measurementId: process.env.DB_MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app); 



