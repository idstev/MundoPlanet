// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbn1bBYJFev9jihhhjYhtH9XtLlhHe7hs",
  authDomain: "mundoplanet2.firebaseapp.com",
  projectId: "mundoplanet2",
  storageBucket: "mundoplanet2.appspot.com",
  messagingSenderId: "579392744204",
  appId: "1:579392744204:web:e88cd2f10bfedb08ff3729",
  databaseURL:"https://mundoplanet2-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime=getDatabase(app)