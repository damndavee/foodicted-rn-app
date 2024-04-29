import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, Auth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {EXPO_FIREBASE_API_KEY, EXPO_FIREBASE_APP_ID, EXPO_FIREBASE_AUTH_DOMAIN, EXPO_FIREBASE_MEASUREMENT_ID, EXPO_FIREBASE_MESSAGING_SENDER_ID, EXPO_FIREBASE_PROJECT_ID, EXPO_FIREBASE_STORAGE_BUCKET  } from '@env';

const firebaseConfig = {
  apiKey: EXPO_FIREBASE_API_KEY, 
  authDomain: EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: EXPO_FIREBASE_PROJECT_ID,
  storageBucket: EXPO_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: EXPO_FIREBASE_APP_ID,
  measurementId: EXPO_FIREBASE_MEASUREMENT_ID
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const analytics = getAnalytics(app);
export const db = getFirestore(app);
