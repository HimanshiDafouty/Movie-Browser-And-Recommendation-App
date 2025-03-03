// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOiDgCT_EhF3Vk_-6E7ej1Afs-G_fiApg",
  authDomain: "netflix-gpt-5aba2.firebaseapp.com",
  projectId: "netflix-gpt-5aba2",
  storageBucket: "netflix-gpt-5aba2.firebasestorage.app",
  messagingSenderId: "1006029255978",
  appId: "1:1006029255978:web:dbc494f93d3f06e0db5a53",
  measurementId: "G-YWNG13PDHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);