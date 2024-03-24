// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBePWEHe3FH0GaiP2PDYMR922HzfTDZ4Bs",
  authDomain: "test-4a784.firebaseapp.com",
  databaseURL: "https://test-4a784-default-rtdb.firebaseio.com",
  projectId: "test-4a784",
  storageBucket: "test-4a784.appspot.com",
  messagingSenderId: "641833934881",
  appId: "1:641833934881:web:dbb7e73712390c3e9dc360",
  measurementId: "G-X2811FNMDV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
