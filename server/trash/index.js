// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


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