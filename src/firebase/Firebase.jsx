import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWSzouZ0KBaio34d6baBw9LYSnTIbzE0Q",
  authDomain: "cash-book-487ce.firebaseapp.com",
  projectId: "cash-book-487ce",
  storageBucket: "cash-book-487ce.appspot.com",
  messagingSenderId: "962403835695",
  appId: "1:962403835695:web:263e103c276aa314514bda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
