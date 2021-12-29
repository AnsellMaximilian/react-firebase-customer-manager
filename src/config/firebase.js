import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDLQrqD-Ey7mfi9E2JjpwsvwU0q9TzyQIo",
//   authDomain: "rumah-sehat-7966f.firebaseapp.com",
//   projectId: "rumah-sehat-7966f",
//   storageBucket: "rumah-sehat-7966f.appspot.com",
//   messagingSenderId: "933799613254",
//   appId: "1:933799613254:web:4b63fa03259998680fcb47",
// };

// this is testing
const firebaseConfig = {
  apiKey: "AIzaSyAs8unW7pvnJV_ORBxt_D8Kz3rxoLpIaaU",
  authDomain: "cuscation.firebaseapp.com",
  projectId: "cuscation",
  storageBucket: "cuscation.appspot.com",
  messagingSenderId: "324514210461",
  appId: "1:324514210461:web:1c0804ed4b115f3c5aaa74",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
