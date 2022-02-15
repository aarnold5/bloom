// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSXhn6HIdV5jCLL-5p0kzKNFDnkiEiAQA",
  authDomain: "bloom-838b5.firebaseapp.com",
  projectId: "bloom-838b5",
  storageBucket: "bloom-838b5.appspot.com",
  messagingSenderId: "98620041731",
  appId: "1:98620041731:web:3fc5f74041f2f3029c7c36",
  measurementId: "G-T5X1Z5Z64J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const addMessage = httpsCallable(functions, 'helloworld');
addMessage({ text: "text" })
    .then((result) => {
        //read result of cloud funct
        const data = result.data;
        const sanitizedMessage = data.text;
        console.log(data);
    })