import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKIaeP60Jkqs_IVVk3AT2c1AzHdAkTTz4", 
  authDomain: "foodicted-rn-app.firebaseapp.com",
  projectId: "foodicted-rn-app",
  storageBucket: "foodicted-rn-app.appspot.com",
  messagingSenderId: "593338376686",
  appId: "1:593338376686:web:3cd748c8ecb8ee85542eff",
  measurementId: "G-E6QFMD59M1"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);