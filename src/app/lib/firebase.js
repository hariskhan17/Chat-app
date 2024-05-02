// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
        apiKey: "AIzaSyAV3A0386h0qkGmDPsiTy8ii1PFbCNp0bo",
    authDomain: "chat-app-6b89c.firebaseapp.com",
    projectId: "chat-app-6b89c",
    storageBucket: "chat-app-6b89c.appspot.com",
    messagingSenderId: "33346789733",
    appId: "1:33346789733:web:44f3cad4a0cd25f28e418c",
    measurementId: "G-FJX2879XCR"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };