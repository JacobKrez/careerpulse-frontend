// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZXfdDksT9kBU5j2bSl79iv1EhsDTMffY",
  authDomain: "careerpulseai-33309.firebaseapp.com",
  projectId: "careerpulseai-33309",
  storageBucket: "careerpulseai-33309.firebasestorage.app",
  messagingSenderId: "432426663291",
  appId: "1:432426663291:web:7fca39b1badbeec6aa11de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);