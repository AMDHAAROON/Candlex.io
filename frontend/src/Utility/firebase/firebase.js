// src/utility/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATBDTHGLzk3GpRD_fgI4Qt-30AGGABQUk",
  authDomain: "candlex-2025.firebaseapp.com",
  projectId: "candlex-2025",
  storageBucket: "candlex-2025.firebasestorage.app",
  messagingSenderId: "848216314443",
  appId: "1:848216314443:web:b86291eee1cbb82a5773ce",
  measurementId: "G-XRQZZKE4Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);
