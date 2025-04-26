// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFCSyr6oNChPt-zybw4HmJHPXC_ptlXyI",
  authDomain: "interviewprep-b0b0b.firebaseapp.com",
  projectId: "interviewprep-b0b0b",
  storageBucket: "interviewprep-b0b0b.firebasestorage.app",
  messagingSenderId: "92662406716",
  appId: "1:92662406716:web:45626e03e5699e34e3ad39",
  measurementId: "G-WKGK0MBP3N"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);