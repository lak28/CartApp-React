import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLlo4qY1XQX_jlQP_wSkkumcG7UWF7b4c",
  authDomain: "cart-4cf07.firebaseapp.com",
  projectId: "cart-4cf07",
  storageBucket: "cart-4cf07.appspot.com",
  messagingSenderId: "691886336934",
  appId: "1:691886336934:web:cce6b95167e6c9ab07bd67"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




