import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbFD1GQaXXXLaP8vL--nw7n_XuiRr6p3k",
  authDomain: "website-annotator.firebaseapp.com",
  projectId: "website-annotator",
  storageBucket: "website-annotator.appspot.com",
  messagingSenderId: "643994963732",
  appId: "1:643994963732:web:5d2e4c680a64e0f6debc01"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
