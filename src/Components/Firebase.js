// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_AS_wvVIehFp-0N4vcC-KGi4xpgLXZ-8",
  authDomain: "top-wheres-waldo-2ad97.firebaseapp.com",
  projectId: "top-wheres-waldo-2ad97",
  storageBucket: "top-wheres-waldo-2ad97.appspot.com",
  messagingSenderId: "1030259062666",
  appId: "1:1030259062666:web:6f769d9c29ae82ca0cba73",
  measurementId: "G-1VTQD8DE2V"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default { firebaseapp, analytics }