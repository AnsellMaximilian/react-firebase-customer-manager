import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLQrqD-Ey7mfi9E2JjpwsvwU0q9TzyQIo",
  authDomain: "rumah-sehat-7966f.firebaseapp.com",
  projectId: "rumah-sehat-7966f",
  storageBucket: "rumah-sehat-7966f.appspot.com",
  messagingSenderId: "933799613254",
  appId: "1:933799613254:web:4b63fa03259998680fcb47",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
