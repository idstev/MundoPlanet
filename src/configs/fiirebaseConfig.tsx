// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz156-uU7BjuvJQ27ZC9ShjAYw04A-QfY",
  authDomain: "mundoplanet-cf78f.firebaseapp.com",
  projectId: "mundoplanet-cf78f",
  storageBucket: "mundoplanet-cf78f.appspot.com",
  messagingSenderId: "534919412821",
  appId: "1:534919412821:web:a7f6bd6d12105db031e8dc",
  databaseURL:"https://mundoplanet-cf78f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const dbRealTime=getDatabase(app)